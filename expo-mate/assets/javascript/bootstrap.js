// Google maps setup

var map;
google.maps.event.addDomListener(window, 'load', googleMapsInit);


// jQuery bootstrap

$(function () {
    //********* Const
    var lastScrollTop = 0
    , hasScrolled = false
    , imageScroll = $(".image-scroll-wrapper")
    , methodContainer = $('#method')
    , methodScrollContainer = $('.method-scroll-wrapper')
    , methodContainerHeight = $('#method').height()
    , methodContainerOffset = methodContainer.offset().top
    , CaseStudyContainer = $('#case-studies')
    , CaseStudyContainerOffset = ~~$('#case-studies').offset().top
    , aboutContainer = $('#about')
    , preAboutContainer = $('#preabout')
    , preAboutContainerOffset = preAboutContainer.offset().top
    , aboutContainerOffset = aboutContainer.offset().top
    , viewPortHeight = $(window).height()
    , animationIncrements = 600
    , step = 0
    , hasSnapped = false
    , viewPortOffset = $(window).scrollTop()
    , mobileNav = $('#nav ul')
    , hamburgerElem = $('.hamburger');

    //********* Reset page on load
    //$(window).scrollTop(0);
    imageScroll.removeClass('fixed');


    fixNav(viewPortOffset);

    if (~~viewPortOffset >= ~~methodContainerOffset) {
        methodContainer.addClass('show');
    }

    if (~~viewPortOffset >= ~~aboutContainerOffset || ~~viewPortOffset >= ~~preAboutContainerOffset) {
        aboutContainer.addClass('show');
    }

    if(~~viewPortOffset >= ~~CaseStudyContainerOffset){
        CaseStudyContainer.addClass('show');
    }

    //********* Event Handlers

    $('.play-video-wrapper').on('click', function(){
        $('#header').addClass('play');
        $('#header .video-container').addClass('play');
    });

    $('.logo').on('click', function(){
        $("html, body").animate({ scrollTop: 0 });
    });

    $('.toggle-about').on('click', function(e){
        e.preventDefault();
        $("#our-people").toggleClass('open');
        $(this).toggleClass('open');
    });


    $('.close-btn').on('click', function(){
        $('#header').removeClass('play');
        $('#header .video-container').removeClass('play');
    });

    $('.contact-btn').on('click', function(){
        var footerOffset = $('footer').offset().top;
        $("html, body").animate({ scrollTop: footerOffset });
    });


    $('#diagram .method-item').on("mouseenter", function() {
        $(this).addClass('focused').find('.fadeIn').addClass('show');
    }).on("mouseleave", function() {
        $(this).removeClass('focused').find('.fadeIn').removeClass('show');
    });

    $('#nav li a').on('click', function(e){
        e.preventDefault();
        var link = $(this).attr('href');
        var linkPos = $(link).offset().top;
        $("html, body").animate({ scrollTop: linkPos });
    });

    hamburgerElem.click(function(){
        $(this).toggleClass("is-active");
        mobileNav.toggleClass("open");
    });

    $(window).on('mousewheel DOMMouseScroll touchmove', function() {
        hasScrolled = true;
    });

    $(window).on('resize', function(){
        viewPortHeight = $(this).height();
        animationIncrements = $(window).height() / 100 * 20;
    });

    $(document.body).on('touchmove', function(){
        var scroll = ~~$(this).scrollTop();

        getDirection(scroll, lastScrollTop, function(direction, scroll){
            lastScrollTop = scroll;

            fixNav(scroll);

            if(scroll && hasScrolled) {
                // show sections
                if (scroll >= methodContainerOffset) {
                    methodContainer.addClass('show');
                    aboutContainer.removeClass('show');
                }

                if (scroll >= preAboutContainerOffset) {
                    aboutContainer.addClass('show');
                }
              // handleScroll(scroll, direction);
            }
        });
    });

    $(window).on('scroll', function(){
        var scroll = ~~$(this).scrollTop();

        getDirection(scroll, lastScrollTop, function(direction, scroll){
            lastScrollTop = scroll;

            fixNav(scroll);
            if(scroll && hasScrolled) {
                if(direction === 'down') {
                    //on
                    if (scroll >= methodContainerOffset) {
                        if (!hasSnapped) {
                            $('.fadeIn').removeClass('show');
                            $('.method-item').removeClass('show').removeClass('slideOut');
                            methodScrollContainer.addClass('fixed');
                        }
                        hasSnapped = true;
                    }
                    if(hasSnapped) {
                        if (scroll > methodContainerOffset + animationIncrements && scroll < methodContainerOffset + animationIncrements * 2) {
                            step = 1;
                        } else if (scroll > methodContainerOffset + animationIncrements * 2 && scroll < methodContainerOffset + animationIncrements * 3) {
                            step = 2;
                        } else if (scroll > methodContainerOffset + animationIncrements * 3 && scroll < methodContainerOffset + animationIncrements * 4) {
                            step = 3;
                        } else if (scroll > methodContainerOffset + animationIncrements * 4 && scroll < methodContainerOffset + animationIncrements * 5) {
                            step = 4;
                        } else if (scroll > methodContainerOffset + animationIncrements * 5 && scroll < CaseStudyContainerOffset) {
                            step = 5;
                        }
                    }

                    handleMethodScroll(step);

                    if (isElementInViewport(CaseStudyContainer) || scroll >= methodContainerOffset + methodContainerHeight) {
                        $('#case-studies').addClass('show');
                        $('.fadeIn').removeClass('show');
                        $('.method-item').removeClass('show');
                        methodScrollContainer.removeClass('fixed');
                        hasSnapped = false;
                    }

                    if (scroll >= preAboutContainerOffset) {
                        aboutContainer.addClass('show');
                    }
                }

                if(direction === 'up') {
                    //on
                    if (scroll < CaseStudyContainerOffset - animationIncrements) {
                        if (!hasSnapped) {
                            methodScrollContainer.addClass('fixed');
                        }
                        hasSnapped = true;
                    }

                    if(hasSnapped){
                        if (scroll < CaseStudyContainerOffset && scroll > CaseStudyContainerOffset - animationIncrements * 2) {
                            step = 1;
                        } else if (scroll < CaseStudyContainerOffset - animationIncrements * 2 && scroll > CaseStudyContainerOffset - animationIncrements * 3 ) {
                            step = 2;
                        } else if (scroll < CaseStudyContainerOffset - animationIncrements * 3 && scroll > CaseStudyContainerOffset - animationIncrements * 4) {
                            step = 3;
                        } else if (scroll < CaseStudyContainerOffset - animationIncrements * 4 && scroll > CaseStudyContainerOffset - animationIncrements * 5) {
                            step = 4;
                        } else if (scroll < methodContainerOffset + animationIncrements * 2 && scroll > methodContainerOffset) {
                            step = 5;
                        }

                        handleMethodScroll(step);
                    }


                    if (scroll <= methodContainerOffset) {
                        $('#case-studies').addClass('show');
                    }

                    if (scroll <= methodContainerOffset ) {
                        $('.fadeIn').removeClass('show');
                        $('.method-item').removeClass('show').removeClass('slideOut');
                        methodScrollContainer.removeClass('fixed');
                        hasSnapped = false;
                    }
                }
            }
        });
    });
});

function getDirection (scroll, lastScrollTop, callback){
    var direction = null
        , delta = 5;

    if(Math.abs(lastScrollTop - scroll) <= delta) {
        return;
    }

    if (scroll > lastScrollTop){
        direction = 'down';
    } else {
        direction = 'up';
    }
    callback(direction, scroll);
}



function handleMethodScroll(step){
    var toggleClassName = 'show'
    , fadeInElemClass = '.fadeIn'
    , introElemClass = '.intro'
    , designElemClass = '.design'
    , tuningElemClass = '.tuning'
    , constructionElemClass = '.construction'
    , evalElemClass = '.eval'
    , activeElemClass = ''
    , stepMatch = false;

    if(step === 1){
        activeElemClass = introElemClass;
        stepMatch = true;
    } else if(step === 2) {
        activeElemClass = designElemClass;
        stepMatch = true;
    } else if(step === 3) {
        activeElemClass = tuningElemClass;
        stepMatch = true;
    } else if(step === 4) {
        activeElemClass = constructionElemClass;
        stepMatch = true;
    } else if(step === 5) {
        activeElemClass = evalElemClass;
        stepMatch = true;
    }

    if(stepMatch === true){
        $(fadeInElemClass).removeClass(toggleClassName);
        $(fadeInElemClass+activeElemClass).addClass(toggleClassName);
        $(activeElemClass).addClass(toggleClassName);

        if(step >= 2){
            $(introElemClass).addClass('slideOut');
        } else {
            $(introElemClass).removeClass('slideOut');
        }
    }

}

function fixNav(scroll){
    var nav = $("#nav");
    if (scroll >= 500) {
        nav.addClass("fixed");
    } else {
        nav.removeClass("fixed");
    }
}

function googleMapsInit() {
    var myLatlng = new google.maps.LatLng(51.372027, 6.160478);
    var mapOptions = {
        zoom: 15,
        center: myLatlng,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        disableDefaultUI: true,
        styles: [{"featureType":"landscape","stylers":[{"visibility":"simplified"},{"color":"#2b3f57"},{"weight":0.1}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"weight":0.4},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"weight":1.3},{"color":"#FFFFFF"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":3}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":1.1}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":0.4}]},{},{"featureType":"road.highway","elementType":"labels","stylers":[{"weight":0.8},{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.7}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"color":"#6c5b7b"}]},{"featureType":"water","stylers":[{"color":"#f3b191"}]},{"featureType":"transit.line","stylers":[{"visibility":"on"}]}]
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: 'http://jansmolders.nl/expo-mate/assets/images/marker.png',
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content: $('.contact-details-map').html()
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}


function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

/*

function handleImageScroll(scroll, direction){

    var imageScroll = $(".image-scroll-wrapper")
        , foregroundImageOffset = $('.foreground-image').offset().top
        , scrollContainerOffsetTop = imageScroll.offset().top
        , methodContainer = $('#method')
        , methodContainerOffset = methodContainer.offset().top
        , aboutContainer = $('#about')
        , aboutContainerOffset = aboutContainer.offset().top
        , mobileNav = $('#nav ul')
        , hamburgerElem = $('.hamburger');



    if(direction === 'down') {
        //on
        if (scroll > scrollContainerOffsetTop) {
            imageScroll.addClass('fixed');
        }

        //off
        if (foregroundImageOffset === scrollContainerOffsetTop) {
            imageScroll.removeClass('fixed');
        }
    }

    if(direction === 'up') {
        //off
        if (scroll < scrollContainerOffsetTop) {
            imageScroll.removeClass('fixed');
        }
    }

    // show sections
    if (scroll >= methodContainerOffset) {
        methodContainer.addClass('show');
        aboutContainer.removeClass('show');
    }

    if (scroll >= aboutContainerOffset) {
        aboutContainer.addClass('show');
    }
}

*/