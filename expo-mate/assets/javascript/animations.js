$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(function(){
    var aboutAnimationHasRan = false;
    var aboutUsAnimationHasRan = false;
    var valuesAnimationHasRan = false;
    var headerAnimationHasRan = false;
    var brandsAnimationHasRan = false;
    var headerElem = $('#header');
    var aboutElem = $('#about');
    var brandsElem = $('.brandlist');
    var aboutUsElem = $('#about-us');
    var valesElem = $('#values');


    if(headerElem.isInViewport()){
        var logo = $('#header .logo');
        var caption = $('#header h1');
        var playBtn = $('#header .icon-play');
        if (!headerAnimationHasRan) {
            TweenMax.fromTo(logo, .5, {css: {y: "-30", opacity: 0}}, {css:{y:"0", opacity: "1"}});
            TweenMax.fromTo(caption, .5, {css: {y: "-30", opacity: 0}}, {css:{y:"0", opacity: "1"}, delay: .3});
            TweenMax.fromTo(playBtn, .5, {opacity: 0, scale:1.5, ease:Bounce.ease}, {opacity: 1, scale:1});
            headerAnimationHasRan = true;
        }
    }

    $(window).on('resize scroll', function() {

        if(headerElem.isInViewport()){
            var logo = $('#header .logo');
            var caption = $('#header h1');
            var playBtn = $('#header .icon-play');
            if (!headerAnimationHasRan) {
                TweenMax.fromTo(logo, .5, {css: {y: "-30", opacity: 0}}, {css:{y:"0", opacity: "1"}});
                TweenMax.fromTo(caption, .5, {css: {y: "-30", opacity: 0}}, {css:{y:"0", opacity: "1"}, delay: .3});
                TweenMax.fromTo(playBtn, .5, {opacity: 0, scale:1.5, ease:Bounce.ease}, {opacity: 1, scale:1});
                headerAnimationHasRan = true;
            }
        }

        if(aboutElem.isInViewport()){
            var leftSideElem = $('#about > .left-container');
            var rightSideElem = $('#about > .right-container');
            if (!aboutAnimationHasRan) {
                TweenMax.fromTo(leftSideElem, 1, {css: {x: "-100", opacity: 0}}, {css:{x:"0", opacity: "1"}, delay: 1});
                TweenMax.fromTo(rightSideElem, 1, {css: {x: "100", opacity: 0}}, {css:{x:"0", opacity: "1"}, delay: 1});

                aboutAnimationHasRan = true;
            }
        }

        if(aboutUsElem.isInViewport()){
            var emplo = $('.employee-wrapper');
            if (!aboutUsAnimationHasRan) {
                TweenMax.staggerFromTo(emplo, 1, {css: {x: "-100", opacity: 0}}, {css:{x:"0", opacity: "1"}, delay: 1}, 0.5);
                aboutUsAnimationHasRan = true;
            }
        }

        if(brandsElem.isInViewport()){
            var brand = brandsElem.find('li');
            if (!brandsAnimationHasRan) {
                TweenMax.staggerFromTo(brand, .5, {css: {x: "-40", opacity: 0}}, {css:{x:"0", opacity: "1"}, delay: .2}, 0.2);
                brandsAnimationHasRan = true;
            }
        }

        if(valesElem.isInViewport()){
            var valueItem = $('.valueItem');
            if (!valuesAnimationHasRan) {

                $.each(valueItem, function(){
                    var textElem = $(this).find('strong');
                    var randomNum = (Math.random() * (0.5 - 2.9) + 2.9).toFixed(2);
                    TweenMax.fromTo(textElem, 1, {css: {x: "-10", opacity: 0}}, {css:{x:"0", opacity: "1"}, delay: randomNum});
                });

                valuesAnimationHasRan = true;
            }
        }

        if(aboutUsElem.isInViewport()){
            var employee = $('.employee-wrapper');
            if (!aboutUsAnimationHasRan) {
                TweenMax.staggerFromTo(employee, 1, {css: {x: "-100", opacity: 0}}, {css:{x:"0", opacity: "1"}, delay: 1}, 0.5);
                aboutUsAnimationHasRan = true;
            }
        }
    });
});



