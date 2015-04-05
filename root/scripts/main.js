'use strict';

// core module
var rentlife = (function(){ 
    var
        events = [],
        isMobile = { //  mobile detection utility
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        },
        init = function() {
            for (var e in events){
                events[e]();
            }
        },
        refresh = function() {
           $(window).trigger('debouncedresize.slitslider').trigger('resize');
        };
    return {
        events: events,
        isMobile: isMobile,
        init: init,
        refresh: refresh
    };
})();
// end core module


// slitslider module
rentlife.slider = (function(){
    var $navArrows = $('#nav-arrows'),
        $nav = $('#nav-dots > span'),
        $obj  = $('#slider'),
        slitslider = $obj.slitslider({
            onBeforeChange: function(slide, pos) {
                $nav.removeClass('nav-dot-current');
                $nav.eq(pos).addClass('nav-dot-current');
            }
        }),
        init = function() {
            initEvents();
        },
        initEvents = function() {
            // add navigation events
            $navArrows.children(':last').on('click', function() {
                slitslider.next();
                return false;
            });
            $navArrows.children(':first').on('click', function() {
                slitslider.previous();
                return false;
            });
            $nav.each(function(i) {
                $(this).on('click', function() {
                    var $dot = $(this);
                    if (!slitslider.isActive()) {
                        $nav.removeClass('nav-dot-current');
                        $dot.addClass('nav-dot-current');
                    }
                    slitslider.jump(i + 1);
                    return false;
                });
            });
            // everything ready, show the container
            $obj.show();
        },
        refresh = function() {
           $(window).trigger('debouncedresize.slitslider').trigger('resize');
        };
    return {
        init: init,
        refresh: refresh
    };
})();
rentlife.events.push(rentlife.slider.init);
// end slitslider module















// Contacts form module
rentlife.contactForm = function(){
    var
        $form = $('#contactForm'),
        $msgSuccess = $('#successMessage'),
        $msgFailure = $('#failureMessage'),
        $msgIncomplete = $('#incompleteMessage'),
        messageDelay = 2000;

    $form.validate({
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $msgIncomplete.show();
            } else {
                $msgIncomplete.fadeOut();
            }
        },
        submitHandler: function(form) {
            var
                _form = $(form),
                data = _form.serialize(),
                action = _form.attr('action');

            data += '&ajax=true';
            $msgIncomplete.fadeOut();
            _form.fadeOut();

            $.post(action, data)
                .done(function(response){
                    if (response === 'success'){
                        $msgSuccess.fadeIn().delay(messageDelay).fadeOut();
                        _form.trigger('reset');
                    } else {
                        $msgFailure.fadeIn().delay(messageDelay).fadeOut();
                    }
                })
                .fail(function() {
                    $msgFailure.fadeIn().delay(messageDelay).fadeOut();

                })
                .always(function(){
                    _form.delay(messageDelay+500).fadeIn();
                });
            return false;
        }
    });
};
rentlife.events.push(rentlife.contactForm);
// end Contacts form module



$(document).ready(function() {
    // loading overlay
    $('body').queryLoader2({
        barColor: '#222',
        backgroundColor: '#fff',
        percentage: false,
        barHeight: 1

    });
    $('#load').fadeOut().remove();

    if($('#circle-diagram').length) {
        circleDiagram('circle-diagram', 500, 500, '#circle-diagram-data');
    }

    $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
        e.stopPropagation();
    });

    $('input, textarea').placeholder();

    // Start TouchSpin function
    $('input.qty').TouchSpin();

    // Start FitVids function
    $('body').fitVids();
    $('.background-video video').fillparent();

    // Swiper function
    $('.swiper-container').swiper({
        slidesPerView: 'auto'
    });

    // Start OwlCarousel
    $('.owl-carousel').owlCarousel({
      autoPlay : false
    });

    // PrettyPhoto initialization
    $('a[data-rel]').each(function() {
        $(this).attr('rel', $(this).data('rel'));
    });
    $('a[data-rel^=prettyPhoto]').prettyPhoto({
        slideshow: 5000,
        autoplay_slideshow: false,
        social_tools: false
    });

    // Start WOW animations
    if (!rentlife.isMobile.iOS()) {
        new WOW().init();
    }


    // init Theme functions
    rentlife.init();

}).on('click','.navbar-toggle',function() {
    // toggle navigation
    $('.navbar-collapse').toggleClass('in');

}).on('click','.navbar-collapse.in',function(e) {
    // close navigation on click
    if( $(e.target).is('a') ) {
        $('.navbar-collapse').toggleClass('in');
    }
});

$(window).resize(function () {
    if ($(window).width() > 768) {
        $('.collapse').removeClass('in');
    }
});
