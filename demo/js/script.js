/**
 * @function      Include
 * @description   Includes an external scripts to the page
 * @param         {string} scriptUrl
 */
function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}


/**
 * @function      isIE
 * @description   checks if browser is an IE
 * @returns       {number} IE Version
 */
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};


/**
 * @module       Copyright
 * @description  Evaluates the copyright year
 */
;
(function ($) {
    var currentYear = (new Date).getFullYear();
    $(document).ready(function () {
        $("#copyright-year").text((new Date).getFullYear());
    });
})(jQuery);


/**
 * @module       IE Fall&Polyfill
 * @description  Adds some loosing functionality to old IE browsers
 */
;
(function ($) {
    if (isIE() && isIE() < 11) {
        include('js/pointer-events.min.js');
        $('html').addClass('lt-ie11');
        $(document).ready(function () {
            PointerEventsPolyfill.initialize({});
        });
    }

    if (isIE() && isIE() < 10) {
        $('html').addClass('lt-ie10');
    }
})(jQuery);


/**
 * @module       WOW Animation
 * @description  Enables scroll animation on the page
 */
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop') && o.hasClass("wow-animation") && $(".wow").length) {
        include('js/wow.min.js');

        $(document).ready(function () {
            new WOW().init();
        });
    }
})(jQuery);


/**
 * @module       Smoothscroll
 * @description  Enables smooth scrolling on the page
 */
;
(function ($) {
    if ($("html").hasClass("smoothscroll")) {
        include('js/smoothscroll.min.js');
    }
})(jQuery);


/**
 * @module       ToTop
 * @description  Enables ToTop Plugin
 */
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.ui.totop.min.js');

        $(document).ready(function () {
            $().UItoTop({
                easingType: 'easeOutQuart',
                containerClass: 'ui-to-top fa fa-angle-up'
            });
        });
    }
})(jQuery);


/**
 * @module       RD Navbar
 * @description  Enables RD Navbar Plugin
 */
;
(function ($) {
    var o = $('.rd-navbar');
    if (o.length > 0) {

        include('js/jquery.rd-navbar.min.js');
        $(document).ready(function () {
            o.RDNavbar({
                stickUp: false,
                responsive: {
                    0: {
                        layout: 'rd-navbar-fixed'
                    },
                    1200: {
                        layout: o.attr("data-rd-navbar-lg").split(" ")[0]
                    }
                }
            });
        });
    }
})(jQuery);


/**
 * @module       Magnific Popup
 * @description  Enables Magnific Popup Plugin
 */
;
(function ($) {
    var o = $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]'),
        g = $('[data-lightbox^="gallery"]');
    if (o.length > 0 || g.length > 0) {
        include('js/jquery.magnific-popup.min.js');

        $(document).ready(function () {
            if (o.length) {
                o.each(function () {
                    var $this = $(this);
                    $this.magnificPopup({
                        type: $this.attr("data-lightbox")
                    });
                })
            }

            if (g.length) {
                g.each(function () {
                    var $gallery = $(this);
                    $gallery
                        .find('[data-lightbox]').each(function () {
                            var $item = $(this);
                            $item.addClass("mfp-" + $item.attr("data-lightbox"));
                        })
                        .end()
                        .magnificPopup({
                            delegate: '[data-lightbox]',
                            type: "image",
                            gallery: {
                                enabled: true
                            }
                        });
                })
            }
        });
    }
})(jQuery);


/**
 * @module       RD Material Tabs
 * @description  Enables RD Material Tabs
 */
;
(function ($) {
    var o = $('.rd-material-tabs');
    var html = $('html');
    if (o.length) {
        include('../dist/js/jquery.rd-material-tabs.js');

        $(document).ready(function () {
            var uniqueRandoms = [];
            var timer = false,
                timer2 = false;


            o.RDMaterialTabs({
                responsive: {
                    0: {
                        margin: 15,
                        items: 3,
                        stagePadding: 40
                    },
                    768: {
                        margin: 50,
                        stagePadding: 100
                    },
                    992: {
                        margin: 100,
                        items: 4,
                        stagePadding: 100
                    },
                    1200: {
                        items: 5,
                        stagePadding: 150
                    },
                    1600: {
                        items: 6,
                        stagePadding: 200
                    }
                },
                callbacks: {
                    onInit: function () {
                        o.addClass('loaded');
                        if (html.hasClass('desktop')){
                            makeVisible(o.find('.rd-material-tab-active .image').length);
                        }
                    },
                    onChangeStart: function () {
                        if (html.hasClass('desktop')){
                            makeInvisible();
                        }
                    },
                    onChangeEnd: function () {
                        if (html.hasClass('desktop')){
                            makeVisible(o.find('.rd-material-tab-active .image').length);
                        }
                    }
                }
            });

            function makeUniqueRandom(count) {
                if (!uniqueRandoms.length) {
                    for (var i = 0; i < count; i++) {
                        uniqueRandoms.push(i);
                    }
                }
                var index = Math.floor(Math.random() * uniqueRandoms.length);
                var val = uniqueRandoms[index];
                uniqueRandoms.splice(index, 1);
                return val;
            }

            function makeVisible(count) {
                var el = $(".rd-material-tab-active .image"),
                    k = 0,
                    step = 0.3;
                for (var i = 0; i < count; i++) {
                        timer = setTimeout(function () {
                            var rand = makeUniqueRandom(count);
                            el.eq(rand).addClass('visible');
                        }, k * 35);
                        k += step;
                }
                timer2 = setTimeout(function () {
                    el.not('.visible').addClass('visible');
                }, count * step * 35)
            }

            function makeInvisible() {
                var el = $('.image.visible');
                el.removeClass('visible');
                uniqueRandoms = [];
                clearTimeout(timer);
                clearTimeout(timer2);
            }


        });
    }
})(jQuery);




