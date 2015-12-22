###*
 * @module       RDMaterialTabs
 * @author       Rafael Shayvolodyan
 * @version      1.0.0
###

(($, document, window) ->
  ###*
   * Initial flags
   * @public
  ###
  isIE = navigator.appVersion.indexOf("MSIE") isnt -1
  ieVersion = if isIE then parseInt(navigator.appVersion.split("MSIE")[1]) else null
  isTouch = "ontouchstart" of window


  ###*
   * Creates a RDMaterialTabs.
   * @class RDMaterialTabs.
   * @public
   * @param {HTMLElement} element - The element to create the RDMaterialTabs for.
   * @param {Object} [options] - The options
  ###
  class RDMaterialTabs

    ###*
     * Default options for RDMaterialTabs.
     * @public
    ###
    Defaults:
      itemSelector: 'div',
      margin: 20,
      marginContent: 0,
      items: 3,
      touchRatio: 1,
      speed: 500,
      easing: 'cubic-bezier(0.005, 0.300, 0.200, 1.000)'
      stagePadding: 0
      responsive:
        0:
          items: 3
        480:
          items: 4
        768:
          items: 5
      callbacks:
        onDragStart: false
        onDragEnd: false
        onChangeStart: false
        onChangeEnd: false
        onBeforeInit: false
        onInit: false

    constructor: (element, options) ->
      @options = $.extend(true, {}, @Defaults, options)
      @$element = $(element)
      @$list = @$element.find('.rd-material-tabs__list')
      @$content = @$element.find('.rd-material-tabs__container')
      @$win = $(window)
      @$doc = $(document)
      @activeIndex = 0
      @changing = false
      @settings =
        stageClass: 'rd-material-tabs__stage',
        stageOuterClass: 'rd-material-tabs__stage-outer',
        itemClass: 'rd-material-tab'
      @state =
        isTouched: false
        isDragged: false
        isSwiping: false
      @touches =
        prevX: null
        list: false

      @initialize()

    ###*
     * Initializes the RD Material Tabs.
     * @protected
    ###
    initialize: () ->
      ctx = @
      ctx.options.callbacks.onBeforeInit.call(@, ctx) if ctx.options.callbacks.onBeforeInit
      ctx.setVendor(ctx)
      ctx.createDOM(ctx)
      ctx.initHandlers(ctx)
      ctx.$win.trigger('resize')
      ctx.options.callbacks.onInit.call(@, ctx) if ctx.options.callbacks.onInit
      return

    ###*
    * Creates neccessary HTML markup.
    * @protected
    ###
    createDOM: (ctx) ->
      ctx.$content.find('>' + ctx.options.itemSelector).addClass(ctx.settings.itemClass)
      transform = ctx.transform(ctx, 0)
      ctx.$content
      .wrapInner($('<div/>', {
          "class": ctx.settings.stageClass
          "style": ctx.vendorName + 'transform:' + transform[ctx.vendorName + 'transform']
        }))
      .wrapInner($('<div/>', {"class": ctx.settings.stageOuterClass}))

      ctx.$list.find('li').addClass(ctx.settings.itemClass)
      ctx.$list
      .wrapInner($('<div/>', {
          "class": ctx.settings.stageClass
          "style": ctx.vendorName + 'transform:' + transform[ctx.vendorName + 'transform']
        }))
      .wrapInner($('<div/>', {"class": ctx.settings.stageOuterClass}))

    ###*
    * Sets stage width.
    * @param {boolean} list - if true width will be calculated for list of tabs
    * @protected
    ###
    setWidth: (ctx, list) ->
      if list
        stage = ctx.$list.find('.' + ctx.settings.stageClass)
        padding = ctx.getOption('stagePadding')
        if padding > 0
          stage.css({
            'padding-left': padding
            'padding-right': padding
          })
        stageWidth = ctx.getWidth(ctx, ctx.$list.find('.' + ctx.settings.stageOuterClass))
        margin = ctx.getOption('margin')
        itemWidth = (stageWidth - ctx.getOption('items') * margin) / ctx.getOption('items')

      else
        stage = ctx.$content.find('.' + ctx.settings.stageClass)
        padding = 0
        itemWidth = ctx.getWidth(ctx, ctx.$content.find('.' + ctx.settings.stageOuterClass))
        margin = ctx.getOption('marginContent')

      item = stage.find('.' + ctx.settings.itemClass)
      count = item.length

      item.css({
        'width': ctx.px(itemWidth)
        'margin-right': ctx.px(margin)
      })
      stage[0].style.width = ctx.px((itemWidth + margin) * count + margin + padding)
      return

    ###*
    * Resize function.
    * @protected
    ###
    resize: (ctx) ->
      ctx.setWidth(ctx, true)
      ctx.setWidth(ctx, false)
      ctx.moveTo(ctx, ctx.activeIndex)

      ###*
      * Init all JS event handlers
      * @protected
      ###
    initHandlers: (ctx) ->
      ctx.$win.on('resize', $.proxy(ctx.resize, @, ctx))
      if isTouch
        ctx.$element.on('touchstart.rd.mt', $.proxy(ctx.onTouchStart, @, ctx))
      else
        ctx.$element.on('mousedown.rd.mt', $.proxy(ctx.onTouchStart, @, ctx))
        ctx.$element.on('mouseleave.rd.mt', $.proxy(ctx.onTouchEnd, @, ctx))
#        ctx.$list.on('mouseleave.rd.mt', $.proxy(ctx.onTouchEnd, @, ctx))
      return

    ###*
     * Handles the touchend/mouseup events
     * @protected
     ###
    onTouchEnd: (ctx, event) ->
      return if not ctx.state.isTouched
      ctx.$doc.off('.rd.mt')
      ctx.changing = false
      if (event.originalEvent) then event = event.originalEvent
      ctx.state.isTrigerred = false

      if ctx.state.isDragged
        if not isTouch
          ctx.$element.removeClass('rd-material-tabs-grab')
        $(ctx.touches.targetEl).one('click.rd.mt', ->
          return false
        )
        ctx.touches.endTime = Date.now()
        timeDiff = ctx.touches.endTime - ctx.touches.startTime
        ctx.touches.prevX = null
        ctx.state.isDragged = false

        if ctx.touches.list
          if ctx.state.isSwiping
            if timeDiff > 20
              speed = ctx.touches.diff / (timeDiff / 200)
            else
              speed = ctx.touches.diff
          else
            if timeDiff > 100
              speed = ctx.touches.diff / (timeDiff / 1000)
            else
              speed = ctx.touches.diff * (timeDiff / 15)

          ctx.touches.velocity = 0
          ctx.touches.velocity = speed / (timeDiff / 50) * ctx.getOption('touchRatio')

          if ctx.touches.velocity != 0
            ctx.setListTransition(ctx, ctx.options.speed)
            newPosition = ctx.getListTranslate(ctx) + ctx.touches.velocity

            if newPosition > 0
              newPosition = 0
            else if newPosition < ctx.getMaxTranslate(ctx, ctx.$list)
              newPosition = ctx.getMaxTranslate(ctx, ctx.$list)
            ctx.setListTranslate(ctx, newPosition)
        else
          ctx.setContentTransition(ctx, ctx.options.speed)
          ctx.setListTransition(ctx, ctx.options.speed)


          if (ctx.touches.direction is 'left' && ctx.activeIndex is 0) || (ctx.touches.direction is 'right' && ctx.activeIndex is ctx.$content.find('.' + ctx.settings.itemClass).length - 1)
            ctx.moveTo(ctx, ctx.activeIndex)
            return
          index = ctx.activeIndex

          if ctx.state.isSwiping
            if ctx.touches.direction is 'left'
              index = ctx.activeIndex - 1
            else if ctx.touches.direction is 'right'
              index = ctx.activeIndex + 1
          else if Math.abs(ctx.touches.diff) > ctx.getContentItemWidth(ctx) / 3
            if ctx.touches.direction is 'left'
              index = ctx.activeIndex - 1
            else if ctx.touches.direction is 'right'
              index = ctx.activeIndex + 1

          if ctx.activeIndex != index
            ctx.activeIndex = index
            ctx.options.callbacks.onChangeStart.call(@, ctx) if ctx.options.callbacks.onChangeStart
            ctx.changing = true

          ctx.moveTo(ctx, ctx.activeIndex)
      else if not ctx.state.isDragged
        if ctx.touches.list
          el = $(event.target)
          if event.target.tagName is 'A'
            ctx.setContentTransition(ctx, ctx.options.speed)
            ctx.setListTransition(ctx, ctx.options.speed)
            index = el.parent().index()
            if ctx.activeIndex != index
              ctx.activeIndex = index
              ctx.options.callbacks.onChangeStart.call(@, ctx) if ctx.options.callbacks.onChangeStart
              ctx.changing = true
            ctx.moveTo(ctx, ctx.activeIndex)
      ctx.state.isTouched = false
      ctx.options.callbacks.onDragEnd.call(@, ctx) if ctx.options.callbacks.onDragEnd
      return

    ###*
     * Handles the touchmove/mousemove events
     * @protected
     ###
    onDrag: (ctx, event) ->
      return if not ctx.state.isTouched
      if (event.originalEvent) then event = event.originalEvent
      ctx.touches.currentX = if event.type is 'touchmove' then event.targetTouches[0].pageX else event.pageX
      ctx.touches.currentY = if event.type is 'touchmove' then event.targetTouches[0].pageY else event.pageY

      ctx.touches.prevX = ctx.touches.currentX if ctx.touches.prevX is null

      diff = ctx.touches.diff = ctx.touches.currentX - ctx.touches.startX

      diff = diff * ctx.getOption('touchRatio')

      if diff != 0 and  not ctx.state.isTrigerred
        deltaX = ctx.touches.startX - ctx.touches.currentX
        deltaY = ctx.touches.startY - ctx.touches.currentY
        if Math.abs(deltaX) < Math.abs(deltaY)
          ctx.onTouchEnd(ctx, event)
          return
        event.preventDefault()
        if not isTouch
          ctx.$element.addClass('rd-material-tabs-grab')

        if Math.abs(diff) > 0
          ctx.state.isDragged = true
        ctx.state.isTrigerred = true

      ctx.touches.direction = if diff > 0 then 'left' else 'right'
      ctx.touches.currentTranslate = diff + ctx.touches.startTranslate

      if ctx.touches.prevDirection isnt ctx.touches.direction
        ctx.touches.startTime = Date.now()

      ctx.touches.endTime = Date.now()
      timeDiff = ctx.touches.endTime - ctx.touches.startTime

      if ctx.touches.list
        swipeDistance = 8
      else
        swipeDistance = 4

      if Math.abs(ctx.touches.currentX - ctx.touches.prevX) > swipeDistance || (timeDiff < 100 && Math.abs(ctx.touches.currentX - ctx.touches.prevX) > 2)
        ctx.state.isSwiping = true
      else
        ctx.state.isSwiping = false

      ctx.touches.prevX = ctx.touches.currentX
      ctx.touches.prevDirection = ctx.touches.direction

      if ctx.touches.list
        ctx.setListTranslate(ctx, ctx.touches.currentTranslate)
      else
        ctx.setContentTranslate(ctx, ctx.touches.currentTranslate)

      return

    ###*
     * Handles the touchstart/mousedown events
     * @protected
     ###
    onTouchStart: (ctx, event) ->
#      return if ctx.state.isTouched
      if (event.originalEvent) then event = event.originalEvent
      if (event.which is 1 || isTouch)
        ctx.state.isTouched = true
        onClick = ctx.$element.find('[onclick]')
        if onClick.length
          onClick.removeAttr('onclick')
        target = $(event.target)
        ctx.touches.list = ctx.$list.find(target).length > 0

        if ctx.touches.list
          ctx.$list.find('a').on('click.rd.mt touchstart.rd.mt', (e)->
            e.preventDefault();
          )

        ctx.touches.startX = ctx.touches.currentX = if event.type is 'touchstart' then event.targetTouches[0].pageX else event.pageX
        ctx.touches.startY = ctx.touches.currentY = if event.type is 'touchstart' then event.targetTouches[0].pageY else event.pageY
        ctx.touches.startTime = new Date()
        ctx.touches.targetEl = event.target || event.srcElement

        if not isTouch && (ctx.touches.targetEl.tagName is "IMG" || ctx.touches.targetEl.tagName is "A")
          event.preventDefault()

        ctx.$doc.on('mouseup.rd.mt touchend.rd.mt touchcancel.rd.mt', $.proxy(ctx.onTouchEnd, @, ctx))

        ctx.$doc.one('mousemove.rd.mt touchmove.rd.mt', $.proxy((event) ->
          ctx.options.callbacks.onDragStart.call(@, ctx) if ctx.options.callbacks.onDragStart
          if (event.originalEvent) then event = event.originalEvent
          ctx.touches.currentX = if event.type is 'touchmove' then event.targetTouches[0].pageX else event.pageX
          ctx.touches.currentY = if event.type is 'touchmove' then event.targetTouches[0].pageY else event.pageY
          deltaX = ctx.touches.startX - ctx.touches.currentX
          deltaY = ctx.touches.startY - ctx.touches.currentY

          if Math.abs(deltaX) < Math.abs(deltaY)
            ctx.onTouchEnd(ctx, event)
            return

          event.preventDefault()

          if ctx.touches.list
            ctx.touches.startTranslate = ctx.getListTranslate(ctx)
            ctx.setListTransition(ctx, 0)
          else
            ctx.touches.startTranslate = ctx.getContentTranslate(ctx)
            ctx.setContentTransition(ctx, 0)

          ctx.$doc.on('mousemove.rd.mt touchmove.rd.mt', $.proxy(ctx.onDrag, @, ctx))

          if deltaX is 0
            ctx.state.isTrigerred = false
            ctx.$doc.trigger('mousemove.rd.mt touchmove.rd.mt')
            return

          if Math.abs(deltaX) > 1
            ctx.state.isDragged = true
          if not isTouch
            ctx.$element.addClass('rd-material-tabs-grab')

          @))

      return

    ###*
     * Return width of element
     * @protected
     ###
    getWidth: (ctx, el) ->
      return  el.outerWidth()

    ###*
    * Return content item width
    * @protected
    ###
    getContentItemWidth: (ctx) ->
      return  ctx.getWidth(ctx, ctx.$content.find('.' + ctx.settings.itemClass))

    ###*
    * Return list item width
    * @protected
    ###
    getListItemWidth: (ctx) ->
      return  ctx.getWidth(ctx, ctx.$list.find('.' + ctx.settings.itemClass))

    ###*
    * Move list to visible index
    * @param {number} index - index of list element
    * @protected
    ###
    moveListTo: (ctx, index) ->
      if ctx.getOption('items') < ctx.$list.find('.' + ctx.settings.itemClass).length
        itemWidth = ctx.getListItemWidth(ctx)
        offset = -((itemWidth * index) + ctx.getOption('margin') * index)
        if offset < ctx.getMaxTranslate(ctx, ctx.$list)
          offset = ctx.getMaxTranslate(ctx, ctx.$list)
        ctx.setListTranslate(ctx, offset)
      return

    ###*
     * Move content to index
     * @param {number} index - index of content element
     * @protected
     ###
    moveTo: (ctx, index) ->
      itemWidth = ctx.getContentItemWidth(ctx)
      offset = -((itemWidth * index) + ctx.getOption('marginContent') * index)
      ctx.setContentTranslate(ctx, offset)
      ctx.moveListTo(ctx, index)
      ctx.updateActive(ctx, index)

      return

    ###*
     * Converts Number to Pixels.
     * @param {number} num
     * @returns {string} pixels
     * @protected
    ###
    px: (num) ->
      num + "px"

    ###*
    * Creates transform property.
    * @param {number} pos
    * @protected
    ###
    transform: (ctx, pos) ->
      obj = new Object
      if (isIE and ieVersion < 10) || ctx.isPerspective() is false
        obj[ctx.vendorName + "transform"] = "translate(" + ctx.px(pos) + ", 0)"
      else
        obj[ctx.vendorName + "transform"] = "translate3d(" + ctx.px(pos) + ", 0, 0)"
      return obj

    ###*
    * Update acitve class of list and content elements
    * @param {number} index - index of active element
    * @protected
    ###
    updateActive: (ctx, index) ->
      itemWidth = ctx.getContentItemWidth(ctx)
      translate = ctx.getContentTranslate(ctx)

      if !index?
        index = ctx.activeIndex = Math.round(Math.abs(translate / itemWidth))
      ctx.$element.find('.' + ctx.settings.itemClass + '-active').removeClass(ctx.settings.itemClass + '-active')
      ctx.$list.find('.' + ctx.settings.itemClass).eq(index).addClass(ctx.settings.itemClass + '-active')
      ctx.$content.find('.' + ctx.settings.itemClass).eq(index).addClass(ctx.settings.itemClass + '-active')
      if ctx.changing
        ctx.options.callbacks.onChangeEnd.call(@, ctx) if ctx.options.callbacks.onChangeEnd
      return

    ###*
    * Return active index
    * @protected
    ###
    getActiveIndex: (ctx) ->
      return ctx.$content.find('.' + ctx.settings.itemClass + '-active').index()

    ###*
    * Return current translate of element
    * @protected
    ###
    getTranslate: (ctx, el) ->
      transformMatrix = el.css(ctx.vendorName + "transform")
      matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',')
      x = matrix[12] || matrix[4]
      y = matrix[13] || matrix[5]
      return parseInt(x)

    ###*
    * Return current translate of list stage
    * @protected
    ###
    getListTranslate: (ctx) ->
      return ctx.getTranslate(ctx, ctx.$list.find('.' + ctx.settings.stageClass))

    ###*
    * Return current translate of content stage
    * @protected
    ###
    getContentTranslate: (ctx) ->
      return ctx.getTranslate(ctx, ctx.$content.find('.' + ctx.settings.stageClass))

    ###*
    * Sets transition on element
    * @param {jQuery Object} el - element
    * @param {number} duration - duration of animation (in ms)
    * @protected
    ###
    setTransition: (ctx, el, duration) ->
      $(el).css(ctx.vendorName + 'transition', duration / 1000 + 's all ' + ctx.options.easing)
      return

    ###*
    * Sets transition on list stage
    * @param {number} duration - duration of animation (in ms)
    * @protected
    ###
    setListTransition: (ctx, duration) ->
      ctx.setTransition(ctx, ctx.$list.find('.' + ctx.settings.stageClass), duration)
      return

    ###*
    * Sets transition on content stage
    * @param {number} duration - duration of animation (in ms)
    * @protected
    ###
    setContentTransition: (ctx, duration) ->
      ctx.setTransition(ctx, ctx.$content.find('.' + ctx.settings.stageClass), duration)
      return

    ###*
    * Sets translate on element
    * @param {jQuery Object} el - element
    * @param {number} value - value of translate
    * @protected
    ###
    setTranslate: (ctx, el, value) ->
      transform = ctx.transform(ctx, value)
      el.css(ctx.vendorName + 'transform', transform[ctx.vendorName + 'transform'])
      return

    ###*
    * Sets translate on list stage
    * @param {number} value - value of translate
    * @protected
    ###
    setListTranslate: (ctx, value) ->
      ctx.setTranslate(ctx, ctx.$list.find('.' + ctx.settings.stageClass), value)
      return

    ###*
    * Sets translate on content stage
    * @param {number} value - value of translate
    * @protected
    ###
    setContentTranslate: (ctx, value) ->
      ctx.setTranslate(ctx, ctx.$content.find('.' + ctx.settings.stageClass), value)
      return

    ###*
    * Return  max value of translate stage
    * @param {jQuery object} el - element
    * @protected
    ###
    getMaxTranslate: (ctx, el) ->
      return ctx.$win.width() - el.find('.' + ctx.settings.stageClass).outerWidth()

    ###*
    * Sets Vendor prefix
    * @protected
    ###
    setVendor: ->
      transformVendor = @.isTransform()
      @.vendorName = transformVendor.replace(/Transform/i, '')
      @.vendorName = if @.vendorName isnt '' then '-' + @.vendorName.toLowerCase() + '-' else ''
      return

    ###*
    * Checks for CSS support
    * @param {Array} array - The CSS properties to check for
    * @returns {Array} - Contains the supported CSS property name and its index or false
    * @protected
    ###
    isStyleSupported: (array) ->
      fake = document.createElement('div')
      list = array
      for p of list
        s = list[p]
        if typeof fake.style[s] isnt 'undefined'
          fake = null
          return [s, p]
      return false

    ###*
	  * Checks for CSS perspective support
	  * @returns {String} The supported property name or false
    * @protected
    ###
    isPerspective: ->
      return @.isStyleSupported(['perspective', 'webkitPerspective', 'MozPerspective', 'OPerspective',
                                 'MsPerspective'])[0]

    ###*
	  * Checks for CSS transform support
	  * @returns {String} The supported property name or false
    * @protected
    ###
    isTransform: ->
      return @.isStyleSupported(['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'])[0]

    ###*
    * Gets specific option of plugin
    * @protected
    ###
    getOption: (key)->
      for point of @.options.responsive
        if point <= @.$win.width() then targetPoint = point
      if @.options.responsive[targetPoint][key]? then @.options.responsive[targetPoint][key] else @.options[key]


  ###*
   * The jQuery Plugin for the RD Material Tabs
   * @public
  ###
  $.fn.extend RDMaterialTabs: (options) ->
    @each ->
      $this = $(this)
      if !$this.data('RDMaterialTabs')
        $this.data 'RDMaterialTabs', new RDMaterialTabs(this, options)

  window.RDMaterialTabs = RDMaterialTabs) window.jQuery, document, window


###*
 * The Plugin AMD export
 * @public
###
if module?
  module.exports = window.RDMaterialTabs
else if typeof define is 'function' && define.amd
  define(["jquery"], () ->
    'use strict'
    return window.RDMaterialTabs
  )