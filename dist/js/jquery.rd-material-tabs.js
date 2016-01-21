/**
 * @module       RDMaterialTabs
 * @author       Rafael Shayvolodyan
 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
 * @version      1.0.2
 */

(function() {
  (function($, document, window) {

    /**
     * Initial flags
     * @public
     */
    var RDMaterialTabs, ieVersion, isIE, isTouch;
    isIE = navigator.appVersion.indexOf("MSIE") !== -1;
    ieVersion = isIE ? parseInt(navigator.appVersion.split("MSIE")[1]) : null;
    isTouch = "ontouchstart" in window;

    /**
     * Creates a RDMaterialTabs.
     * @class RDMaterialTabs.
     * @public
     * @param {HTMLElement} element - The element to create the RDMaterialTabs for.
     * @param {Object} [options] - The options
     */
    RDMaterialTabs = (function() {

      /**
       * Default options for RDMaterialTabs.
       * @public
       */
      RDMaterialTabs.prototype.Defaults = {
        itemSelector: 'div',
        margin: 20,
        marginContent: 0,
        items: 3,
        touchRatio: 1,
        speed: 500,
        easing: 'cubic-bezier(0.005, 0.300, 0.200, 1.000)',
        stagePadding: 0,
        dragContent: true,
        dragList: true,
        responsive: null,
        callbacks: {
          onDragStart: false,
          onDragEnd: false,
          onChangeStart: false,
          onChangeEnd: false,
          onBeforeInit: false,
          onInit: false
        }
      };

      function RDMaterialTabs(element, options) {
        this.options = $.extend(true, {}, this.Defaults, options);
        this.$element = $(element);
        this.$list = this.$element.find('.rd-material-tabs__list');
        this.$content = this.$element.find('.rd-material-tabs__container');
        this.$win = $(window);
        this.$doc = $(document);
        this.activeIndex = 0;
        this.settings = {
          stageClass: 'rd-material-tabs__stage',
          stageOuterClass: 'rd-material-tabs__stage-outer',
          itemClass: 'rd-material-tab'
        };
        this.state = {
          isTouched: false,
          isDragged: false,
          isSwiping: false
        };
        this.touches = {
          prevX: null,
          list: false
        };
        this.initialize();
      }


      /**
       * Initializes the RD Material Tabs.
       * @protected
       */

      RDMaterialTabs.prototype.initialize = function() {
        var ctx;
        ctx = this;
        if (ctx.options.callbacks.onBeforeInit) {
          ctx.options.callbacks.onBeforeInit.call(this, ctx);
        }
        ctx.setVendor(ctx);
        ctx.createDOM(ctx);
        ctx.initHandlers(ctx);
        if (!isTouch) {
          ctx.canMoveCursor();
        }
        ctx.setWidth(ctx, true);
        ctx.setWidth(ctx, false);
        ctx.moveTo(ctx.activeIndex);
        if (ctx.options.callbacks.onInit) {
          ctx.options.callbacks.onInit.call(this, ctx);
        }
      };


      /**
      * Creates neccessary HTML markup.
      * @protected
       */

      RDMaterialTabs.prototype.createDOM = function(ctx) {
        var transform;
        ctx.$content.find('>' + ctx.options.itemSelector).addClass(ctx.settings.itemClass);
        transform = ctx.transform(ctx, 0);
        ctx.$content.wrapInner($('<div/>', {
          "class": ctx.settings.stageClass,
          "style": ctx.vendorName + 'transform:' + transform[ctx.vendorName + 'transform']
        })).wrapInner($('<div/>', {
          "class": ctx.settings.stageOuterClass
        }));
        ctx.$list.find('li').addClass(ctx.settings.itemClass);
        return ctx.$list.wrapInner($('<div/>', {
          "class": ctx.settings.stageClass,
          "style": ctx.vendorName + 'transform:' + transform[ctx.vendorName + 'transform']
        })).wrapInner($('<div/>', {
          "class": ctx.settings.stageOuterClass
        }));
      };


      /**
      * Sets stage width.
      * @param {boolean} list - if true width will be calculated for list of tabs
      * @protected
       */

      RDMaterialTabs.prototype.setWidth = function(ctx, list) {
        var count, item, itemWidth, margin, padding, stage, stageWidth;
        if (list) {
          stage = ctx.$list.find('.' + ctx.settings.stageClass);
          padding = ctx.getOption('stagePadding');
          if (padding > 0 && ctx.getOption('dragList')) {
            stage.css({
              'padding-left': padding,
              'padding-right': padding
            });
          }
          stageWidth = ctx.getWidth(ctx, ctx.$list.find('.' + ctx.settings.stageOuterClass));
          margin = ctx.getOption('margin');
          itemWidth = (stageWidth - ctx.getOption('items') * margin) / ctx.getOption('items');
        } else {
          stage = ctx.$content.find('.' + ctx.settings.stageClass);
          padding = 0;
          itemWidth = ctx.getWidth(ctx, ctx.$content.find('.' + ctx.settings.stageOuterClass));
          margin = ctx.getOption('marginContent');
        }
        item = stage.find('.' + ctx.settings.itemClass);
        if (list && !ctx.getOption('dragList')) {
          ctx.setListTranslate(ctx, 0);
          stage.css({
            'padding-left': 0,
            'padding-right': 0,
            'width': 'auto'
          });
          item.removeAttr('style');
          return;
        }
        count = item.length;
        item.css({
          'width': ctx.px(itemWidth),
          'margin-right': ctx.px(margin)
        });
        stage[0].style.width = ctx.px((itemWidth + margin) * count + margin + padding);
      };


      /**
      * Resize function.
      * @protected
       */

      RDMaterialTabs.prototype.resize = function(ctx) {
        ctx.setWidth(ctx, true);
        ctx.setWidth(ctx, false);
        return setTimeout(function() {
          return ctx.moveTo(ctx.activeIndex);
        }, 300);
      };


      /**
      * Init all JS event handlers
      * @protected
       */

      RDMaterialTabs.prototype.initHandlers = function(ctx) {
        ctx.$win.on('resize', $.proxy(ctx.resize, this, ctx));
        if (isTouch) {
          ctx.$element.on('touchstart.rd.mt', $.proxy(ctx.onTouchStart, this, ctx));
        } else {
          ctx.$element.on('mousedown.rd.mt', $.proxy(ctx.onTouchStart, this, ctx));
          ctx.$element.on('mouseleave.rd.mt', $.proxy(ctx.onTouchEnd, this, ctx));
        }
      };


      /**
       * Handles the touchend/mouseup events
       * @protected
       */

      RDMaterialTabs.prototype.onTouchEnd = function(ctx, event) {
        var el, index, newPosition, speed, timeDiff;
        if (!ctx.state.isTouched) {
          return;
        }
        ctx.$doc.off('.rd.mt');
        ctx.changing = false;
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        ctx.state.isTrigerred = false;
        if (ctx.state.isDragged) {
          if (!isTouch) {
            ctx.$element.removeClass('rd-material-tabs-grab');
          }
          $(ctx.touches.targetEl).one('click.rd.mt', function() {
            return false;
          });
          ctx.touches.endTime = Date.now();
          timeDiff = ctx.touches.endTime - ctx.touches.startTime;
          ctx.touches.prevX = null;
          ctx.state.isDragged = false;
          if (ctx.touches.list && ctx.getOption('dragList')) {
            if (ctx.state.isSwiping) {
              if (timeDiff > 20) {
                speed = ctx.touches.diff / (timeDiff / 200);
              } else {
                speed = ctx.touches.diff;
              }
            } else {
              if (timeDiff > 100) {
                speed = ctx.touches.diff / (timeDiff / 1000);
              } else {
                speed = ctx.touches.diff * (timeDiff / 15);
              }
            }
            ctx.touches.velocity = 0;
            ctx.touches.velocity = speed / (timeDiff / 50) * ctx.getOption('touchRatio');
            if (ctx.touches.velocity !== 0) {
              ctx.setListTransition(ctx, ctx.options.speed);
              newPosition = ctx.getListTranslate(ctx) + ctx.touches.velocity;
              if (newPosition > 0) {
                newPosition = 0;
              } else if (newPosition < ctx.getMaxTranslate(ctx, ctx.$list)) {
                newPosition = ctx.getMaxTranslate(ctx, ctx.$list);
              }
              ctx.setListTranslate(ctx, newPosition);
            }
          } else if (!ctx.touches.list && ctx.getOption('dragContent')) {
            ctx.setContentTransition(ctx, ctx.options.speed);
            ctx.setListTransition(ctx, ctx.options.speed);
            if ((ctx.touches.direction === 'left' && ctx.activeIndex === 0) || (ctx.touches.direction === 'right' && ctx.activeIndex === ctx.$content.find('.' + ctx.settings.itemClass).length - 1)) {
              ctx.moveTo(ctx.activeIndex);
              return;
            }
            index = ctx.activeIndex;
            if (ctx.state.isSwiping) {
              if (ctx.touches.direction === 'left') {
                index = ctx.activeIndex - 1;
              } else if (ctx.touches.direction === 'right') {
                index = ctx.activeIndex + 1;
              }
            } else if (Math.abs(ctx.touches.diff) > ctx.getContentItemWidth(ctx) / 3) {
              if (ctx.touches.direction === 'left') {
                index = ctx.activeIndex - 1;
              } else if (ctx.touches.direction === 'right') {
                index = ctx.activeIndex + 1;
              }
            }
            ctx.moveTo(index);
          }
        } else if (!ctx.state.isDragged) {
          if (ctx.touches.list) {
            el = $(event.target);
            if (event.target.tagName === 'A' || el.parents('.' + ctx.settings.itemClass + ' a').length) {
              ctx.setContentTransition(ctx, ctx.options.speed);
              ctx.setListTransition(ctx, ctx.options.speed);
              index = el.parents('.' + ctx.settings.itemClass).index();
              ctx.moveTo(index);
            }
          }
        }
        ctx.state.isTouched = false;
        if (ctx.options.callbacks.onDragEnd) {
          ctx.options.callbacks.onDragEnd.call(this, ctx);
        }
      };


      /**
       * Handles the touchmove/mousemove events
       * @protected
       */

      RDMaterialTabs.prototype.onDrag = function(ctx, event) {
        var deltaX, deltaY, diff, swipeDistance, timeDiff;
        if (!ctx.state.isTouched) {
          return;
        }
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        ctx.touches.currentX = event.type === 'touchmove' ? event.targetTouches[0].pageX : event.pageX;
        ctx.touches.currentY = event.type === 'touchmove' ? event.targetTouches[0].pageY : event.pageY;
        if (ctx.touches.prevX === null) {
          ctx.touches.prevX = ctx.touches.currentX;
        }
        diff = ctx.touches.diff = ctx.touches.currentX - ctx.touches.startX;
        diff = diff * ctx.getOption('touchRatio');
        if (diff !== 0 && !ctx.state.isTrigerred) {
          deltaX = ctx.touches.startX - ctx.touches.currentX;
          deltaY = ctx.touches.startY - ctx.touches.currentY;
          if (Math.abs(deltaX) < Math.abs(deltaY)) {
            ctx.onTouchEnd(ctx, event);
            return;
          }
          event.preventDefault();
          if (!isTouch && ((ctx.touches.list && ctx.getOption('dragList')) || (!ctx.touches.list && ctx.getOption('dragContent')))) {
            ctx.$element.addClass('rd-material-tabs-grab');
          }
          if (Math.abs(diff) > 0) {
            ctx.state.isDragged = true;
          }
          ctx.state.isTrigerred = true;
        }
        ctx.touches.direction = diff > 0 ? 'left' : 'right';
        ctx.touches.currentTranslate = diff + ctx.touches.startTranslate;
        if (ctx.touches.prevDirection !== ctx.touches.direction) {
          ctx.touches.startTime = Date.now();
        }
        ctx.touches.endTime = Date.now();
        timeDiff = ctx.touches.endTime - ctx.touches.startTime;
        if (ctx.touches.list) {
          swipeDistance = 8;
        } else {
          swipeDistance = 4;
        }
        if (Math.abs(ctx.touches.currentX - ctx.touches.prevX) > swipeDistance || (timeDiff < 100 && Math.abs(ctx.touches.currentX - ctx.touches.prevX) > 2)) {
          ctx.state.isSwiping = true;
        } else {
          ctx.state.isSwiping = false;
        }
        ctx.touches.prevX = ctx.touches.currentX;
        ctx.touches.prevDirection = ctx.touches.direction;
        if (ctx.touches.list && ctx.getOption('dragList')) {
          ctx.setListTranslate(ctx, ctx.touches.currentTranslate);
        } else if (!ctx.touches.list && ctx.getOption('dragContent')) {
          ctx.setContentTranslate(ctx, ctx.touches.currentTranslate);
        }
      };


      /**
       * Handles the touchstart/mousedown events
       * @protected
       */

      RDMaterialTabs.prototype.onTouchStart = function(ctx, event) {
        var onClick, target;
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        if (event.which === 1 || isTouch) {
          ctx.state.isTouched = true;
          onClick = ctx.$element.find('[onclick]');
          if (onClick.length) {
            onClick.removeAttr('onclick');
          }
          target = $(event.target);
          ctx.touches.list = ctx.$list.find(target).length > 0;
          if (ctx.touches.list) {
            ctx.$list.find('a').on('click.rd.mt touchstart.rd.mt', function(e) {
              return e.preventDefault();
            });
          }
          ctx.touches.startX = ctx.touches.currentX = event.type === 'touchstart' ? event.targetTouches[0].pageX : event.pageX;
          ctx.touches.startY = ctx.touches.currentY = event.type === 'touchstart' ? event.targetTouches[0].pageY : event.pageY;
          ctx.touches.startTime = new Date();
          ctx.touches.targetEl = event.target || event.srcElement;
          if (!isTouch && (ctx.touches.targetEl.tagName === "IMG" || ctx.touches.targetEl.tagName === "A")) {
            event.preventDefault();
          }
          ctx.$doc.on('mouseup.rd.mt touchend.rd.mt touchcancel.rd.mt', $.proxy(ctx.onTouchEnd, this, ctx));
          ctx.$doc.one('mousemove.rd.mt touchmove.rd.mt', $.proxy(function(event) {
            var deltaX, deltaY;
            if (ctx.options.callbacks.onDragStart) {
              ctx.options.callbacks.onDragStart.call(this, ctx);
            }
            if (event.originalEvent) {
              event = event.originalEvent;
            }
            ctx.touches.currentX = event.type === 'touchmove' ? event.targetTouches[0].pageX : event.pageX;
            ctx.touches.currentY = event.type === 'touchmove' ? event.targetTouches[0].pageY : event.pageY;
            deltaX = ctx.touches.startX - ctx.touches.currentX;
            deltaY = ctx.touches.startY - ctx.touches.currentY;
            if (Math.abs(deltaX) < Math.abs(deltaY)) {
              ctx.onTouchEnd(ctx, event);
              return;
            }
            event.preventDefault();
            if (ctx.touches.list) {
              ctx.touches.startTranslate = ctx.getListTranslate(ctx);
              ctx.setListTransition(ctx, 0);
            } else {
              ctx.touches.startTranslate = ctx.getContentTranslate(ctx);
              ctx.setContentTransition(ctx, 0);
            }
            ctx.$doc.on('mousemove.rd.mt touchmove.rd.mt', $.proxy(ctx.onDrag, this, ctx));
            if (deltaX === 0) {
              ctx.state.isTrigerred = false;
              ctx.$doc.trigger('mousemove.rd.mt touchmove.rd.mt');
              return;
            }
            if (Math.abs(deltaX) > 1) {
              ctx.state.isDragged = true;
            }
            if (!isTouch && ((ctx.touches.list && ctx.getOption('dragList')) || (!ctx.touches.list && ctx.getOption('dragContent')))) {
              ctx.$element.addClass('rd-material-tabs-grab');
            }
            return this;
          }));
        }
      };


      /**
       * Return width of element
       * @protected
       */

      RDMaterialTabs.prototype.getWidth = function(ctx, el) {
        return el.outerWidth();
      };


      /**
      * Return content item width
      * @protected
       */

      RDMaterialTabs.prototype.getContentItemWidth = function(ctx) {
        return ctx.getWidth(ctx, ctx.$content.find('.' + ctx.settings.itemClass));
      };


      /**
      * Return list item width
      * @protected
       */

      RDMaterialTabs.prototype.getListItemWidth = function(ctx) {
        return ctx.getWidth(ctx, ctx.$list.find('.' + ctx.settings.itemClass));
      };


      /**
      * Move list to visible index
      * @param {number} index - index of list element
      * @protected
       */

      RDMaterialTabs.prototype.moveListTo = function(ctx, index) {
        var itemWidth, offset;
        if (ctx.getOption('items') < ctx.$list.find('.' + ctx.settings.itemClass).length) {
          itemWidth = ctx.getListItemWidth(ctx);
          offset = -((itemWidth * index) + ctx.getOption('margin') * index);
          if (offset < ctx.getMaxTranslate(ctx, ctx.$list)) {
            offset = ctx.getMaxTranslate(ctx, ctx.$list);
          }
          ctx.setListTranslate(ctx, offset);
        }
      };


      /**
       * Move content to index
       * @param {number} index - index of content element
       * @protected
       */

      RDMaterialTabs.prototype.moveTo = function(index) {
        var itemWidth, offset;
        if (index !== this.activeIndex) {
          if (this.options.callbacks.onChangeStart) {
            this.options.callbacks.onChangeStart.call(this);
          }
        }
        itemWidth = this.getContentItemWidth(this);
        offset = -((itemWidth * index) + this.getOption('marginContent') * index);
        this.setContentTranslate(this, offset);
        if (this.getOption('dragList')) {
          this.moveListTo(this, index);
        }
        this.updateActive(this, index);
      };

      RDMaterialTabs.prototype.canMoveCursor = function() {
        var ctx;
        ctx = this;
        ctx.$list.on('mouseenter', function() {
          if (ctx.getOption('dragList')) {
            ctx.$element.addClass('rd-material-tabs-canMove');
          } else {
            ctx.$element.removeClass('rd-material-tabs-canMove');
          }
        });
        ctx.$list.on('mouseleave', function() {
          ctx.$element.removeClass('rd-material-tabs-canMove');
          console.log(1);
        });
        ctx.$content.on('mouseenter', function() {
          if (ctx.getOption('dragContent')) {
            ctx.$element.addClass('rd-material-tabs-canMove');
          } else {
            ctx.$element.removeClass('rd-material-tabs-canMove');
          }
        });
        ctx.$content.on('mouseleave', function() {
          ctx.$element.removeClass('rd-material-tabs-canMove');
        });
      };


      /**
       * Converts Number to Pixels.
       * @param {number} num
       * @returns {string} pixels
       * @protected
       */

      RDMaterialTabs.prototype.px = function(num) {
        return num + "px";
      };


      /**
      * Creates transform property.
      * @param {number} pos
      * @protected
       */

      RDMaterialTabs.prototype.transform = function(ctx, pos) {
        var obj;
        obj = new Object;
        if ((isIE && ieVersion < 10) || ctx.isPerspective() === false) {
          obj[ctx.vendorName + "transform"] = "translate(" + ctx.px(pos) + ", 0)";
        } else {
          obj[ctx.vendorName + "transform"] = "translate3d(" + ctx.px(pos) + ", 0, 0)";
        }
        return obj;
      };


      /**
      * Update acitve class of list and content elements
      * @param {number} index - index of active element
      * @protected
       */

      RDMaterialTabs.prototype.updateActive = function(ctx, index) {
        var itemWidth, translate;
        itemWidth = ctx.getContentItemWidth(ctx);
        translate = ctx.getContentTranslate(ctx);
        if (index == null) {
          index = ctx.activeIndex = Math.round(Math.abs(translate / itemWidth));
        }
        ctx.$element.find('.' + ctx.settings.itemClass + '-active').removeClass(ctx.settings.itemClass + '-active');
        ctx.$list.find('.' + ctx.settings.itemClass).eq(index).addClass(ctx.settings.itemClass + '-active');
        ctx.$content.find('.' + ctx.settings.itemClass).eq(index).addClass(ctx.settings.itemClass + '-active');
        if (index !== ctx.activeIndex) {
          ctx.activeIndex = index;
          if (ctx.options.callbacks.onChangeEnd) {
            ctx.options.callbacks.onChangeEnd.call(this, ctx);
          }
        }
      };


      /**
      * Return active index
      * @protected
       */

      RDMaterialTabs.prototype.getActiveIndex = function(ctx) {
        return ctx.$content.find('.' + ctx.settings.itemClass + '-active').index();
      };


      /**
      * Return current translate of element
      * @protected
       */

      RDMaterialTabs.prototype.getTranslate = function(ctx, el) {
        var matrix, transformMatrix, x, y;
        transformMatrix = el.css(ctx.vendorName + "transform");
        matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
        x = matrix[12] || matrix[4];
        y = matrix[13] || matrix[5];
        return parseInt(x);
      };


      /**
      * Return current translate of list stage
      * @protected
       */

      RDMaterialTabs.prototype.getListTranslate = function(ctx) {
        return ctx.getTranslate(ctx, ctx.$list.find('.' + ctx.settings.stageClass));
      };


      /**
      * Return current translate of content stage
      * @protected
       */

      RDMaterialTabs.prototype.getContentTranslate = function(ctx) {
        return ctx.getTranslate(ctx, ctx.$content.find('.' + ctx.settings.stageClass));
      };


      /**
      * Sets transition on element
      * @param {jQuery Object} el - element
      * @param {number} duration - duration of animation (in ms)
      * @protected
       */

      RDMaterialTabs.prototype.setTransition = function(ctx, el, duration) {
        $(el).css(ctx.vendorName + 'transition', duration / 1000 + 's all ' + ctx.options.easing);
      };


      /**
      * Sets transition on list stage
      * @param {number} duration - duration of animation (in ms)
      * @protected
       */

      RDMaterialTabs.prototype.setListTransition = function(ctx, duration) {
        ctx.setTransition(ctx, ctx.$list.find('.' + ctx.settings.stageClass), duration);
      };


      /**
      * Sets transition on content stage
      * @param {number} duration - duration of animation (in ms)
      * @protected
       */

      RDMaterialTabs.prototype.setContentTransition = function(ctx, duration) {
        ctx.setTransition(ctx, ctx.$content.find('.' + ctx.settings.stageClass), duration);
      };


      /**
      * Sets translate on element
      * @param {jQuery Object} el - element
      * @param {number} value - value of translate
      * @protected
       */

      RDMaterialTabs.prototype.setTranslate = function(ctx, el, value) {
        var transform;
        transform = ctx.transform(ctx, value);
        el.css(ctx.vendorName + 'transform', transform[ctx.vendorName + 'transform']);
      };


      /**
      * Sets translate on list stage
      * @param {number} value - value of translate
      * @protected
       */

      RDMaterialTabs.prototype.setListTranslate = function(ctx, value) {
        ctx.setTranslate(ctx, ctx.$list.find('.' + ctx.settings.stageClass), value);
      };


      /**
      * Sets translate on content stage
      * @param {number} value - value of translate
      * @protected
       */

      RDMaterialTabs.prototype.setContentTranslate = function(ctx, value) {
        ctx.setTranslate(ctx, ctx.$content.find('.' + ctx.settings.stageClass), value);
      };


      /**
      * Return  max value of translate stage
      * @param {jQuery object} el - element
      * @protected
       */

      RDMaterialTabs.prototype.getMaxTranslate = function(ctx, el) {
        return ctx.$win.width() - ctx.getWidth(ctx, el.find('.' + ctx.settings.stageClass));
      };


      /**
      * Sets Vendor prefix
      * @protected
       */

      RDMaterialTabs.prototype.setVendor = function() {
        var transformVendor;
        transformVendor = this.isTransform();
        this.vendorName = transformVendor.replace(/Transform/i, '');
        this.vendorName = this.vendorName !== '' ? '-' + this.vendorName.toLowerCase() + '-' : '';
      };


      /**
      * Checks for CSS support
      * @param {Array} array - The CSS properties to check for
      * @returns {Array} - Contains the supported CSS property name and its index or false
      * @protected
       */

      RDMaterialTabs.prototype.isStyleSupported = function(array) {
        var fake, list, p, s;
        fake = document.createElement('div');
        list = array;
        for (p in list) {
          s = list[p];
          if (typeof fake.style[s] !== 'undefined') {
            fake = null;
            return [s, p];
          }
        }
        return false;
      };


      /**
      	  * Checks for CSS perspective support
      	  * @returns {String} The supported property name or false
      * @protected
       */

      RDMaterialTabs.prototype.isPerspective = function() {
        return this.isStyleSupported(['perspective', 'webkitPerspective', 'MozPerspective', 'OPerspective', 'MsPerspective'])[0];
      };


      /**
      	  * Checks for CSS transform support
      	  * @returns {String} The supported property name or false
      * @protected
       */

      RDMaterialTabs.prototype.isTransform = function() {
        return this.isStyleSupported(['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'])[0];
      };


      /**
      * Gets specific option of plugin
      * @protected
       */

      RDMaterialTabs.prototype.getOption = function(key) {
        var point, targetPoint;
        if (this.options.responsive != null) {
          for (point in this.options.responsive) {
            if (point <= this.$win.width()) {
              targetPoint = point;
            }
          }
          if (this.options.responsive[targetPoint][key] != null) {
            return this.options.responsive[targetPoint][key];
          } else {
            return this.options[key];
          }
        } else {
          return this.options[key];
        }
      };

      return RDMaterialTabs;

    })();

    /**
     * The jQuery Plugin for the RD Material Tabs
     * @public
     */
    $.fn.extend({
      RDMaterialTabs: function(options) {
        return this.each(function() {
          var $this;
          $this = $(this);
          if (!$this.data('RDMaterialTabs')) {
            return $this.data('RDMaterialTabs', new RDMaterialTabs(this, options));
          }
        });
      }
    });
    return window.RDMaterialTabs = RDMaterialTabs;
  })(window.jQuery, document, window);


  /**
   * The Plugin AMD export
   * @public
   */

  if (typeof module !== "undefined" && module !== null) {
    module.exports = window.RDMaterialTabs;
  } else if (typeof define === 'function' && define.amd) {
    define(["jquery"], function() {
      'use strict';
      return window.RDMaterialTabs;
    });
  }

}).call(this);
