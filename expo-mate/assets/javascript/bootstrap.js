// Google maps setup

var map;
google.maps.event.addDomListener(window, 'load', googleMapsInit);


// jQuery bootstrap

$(function () {
    //********* Const
    var direction = null
    , lastScrollTop = 0
    , delta = 5
    , hasScrolled = false
    , imageScroll = $(".image-scroll-wrapper")
    , foregroundImageOffset = $('.foreground-image').offset().top
    , scrollContainerOffsetTop = imageScroll.offset().top
    , methodContainer = $('#method')
    , methodContainerOffset = methodContainer.offset().top
    , aboutContainer = $('#about')
    , aboutContainerOffset = aboutContainer.offset().top
    , viewPortHeight = $(window).height()
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

    if (~~viewPortOffset >= ~~aboutContainerOffset - 100) {
        aboutContainer.addClass('show');
    }

    //********* Event Handlers

    $('.play-video-wrapper').on('click', function(){
        $('#header').addClass('play');
        $('#header .video-container').addClass('play');
    });

    $('.logo').on('click', function(){
        $("html, body").animate({ scrollTop: 0 });
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
        viewPortOffset = $(this).offset().top;
    });

    $(document.body).on('touchmove', function(){
        var scroll = ~~$(this).scrollTop();

        getDirection(scroll, lastScrollTop, function(direction, scroll){
            lastScrollTop = scroll;

            fixNav(scroll);

            if(scroll && hasScrolled) {
                handleScroll(scroll, direction);
            }
        });
    });

    $(window).on('scroll', function(){
        var scroll = ~~$(this).scrollTop();

        getDirection(scroll, lastScrollTop, function(direction, scroll){
            lastScrollTop = scroll;

            fixNav(scroll);

            if(scroll && hasScrolled && !ignoreFixed) {
                handleScroll(scroll, direction);
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

function handleScroll(scroll, direction){

    var imageScroll = $(".image-scroll-wrapper")
    , foregroundImageOffset = $('.foreground-image').offset().top
    , scrollContainerOffsetTop = imageScroll.offset().top
    , methodContainer = $('#method')
    , methodContainerOffset = methodContainer.offset().top
    , aboutContainer = $('#about')
    , aboutContainerOffset = aboutContainer.offset().top
    , mobileNav = $('#nav ul')
    , hamburgerElem = $('.hamburger');

    hamburgerElem.removeClass("is-active");
    mobileNav.removeClass("open");

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

function debouncer(func, timeout) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        } , timeout );
    };
}