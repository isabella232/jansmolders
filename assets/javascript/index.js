$(function () {

    //const
    var aside = $('aside');
    var body = $('body');

    // Show intro
    $(document).scrollTop(0, 0);
    setTimeout(function () {
        introAnimation();
    }, 100);


    // Open page on the hashed one if provided
    if(window.location.hash) {
        $('.item-wrapper').removeClass('active');
        $(window.location.hash).addClass('active');
    }

    // hide aside on load
    $('aside').addClass('hide');

    $('.hamburger').on('click',function(){
        showAside();
    });

    $('.aside-close').on('click',function(){
        closeAside();
    });

    $('.header-logo').on('click',function(e){
        var next = $(this);
        showNext(next);
    });

    $('.next-box').on('click',function(){
        var next = $(this);
        showNext(next);
    });

    $('aside .tile').on('click',function(){
        var next = $(this);
        showNext(next);
        closeAside();
    });

    $('.item-wrapper').on('click', function(){
        closeAside();
    });

});

function showNext(next){
    var nextClass = next.attr('class').split(' ')[1];
    if(nextClass === 'paragon'){
        $('.item-wrapper').removeClass('active');
    }
    $('#'+nextClass).addClass('active');
}

function showAside(){
    //const
    var aside = $('aside');
    var body = $('body');

    aside.addClass('show').removeClass('hide');
    body.removeClass('asideInactive').addClass('asideActive');
}

function closeAside(){
    //const
    var aside = $('aside');
    var body = $('body');

    if (aside.hasClass("show")) {
        aside.addClass('hide');
        body.addClass('asideInactive');
        setTimeout(function(){
            aside.removeClass('active');
            body.removeClass('asideActive')
        },2000);
    }
}

function introAnimation(){
    var fullHeight;
    fullHeight = $(window).height();

    $(window).resize(function () {
        fullHeight = $(window).height();
    });
    var logoHeight = fullHeight / 2 - 70;
    var tl = new TimelineMax({
        paused: true,
        onComplete: function () {
            $('body').addClass('skipIntro');
        }
    });

    var logoWrapper = '#logo .logo-wrapper';
    tl.set('body', {overflow: 'hidden'});
    tl.set(logoWrapper, {margin: logoHeight + ' auto'});
    tl.set(logoWrapper + ' span', {autoAlpha: 0});
    tl.set(logoWrapper + ' span.top,'+ logoWrapper + ' span.bottom', {width: 0});
    tl.set(logoWrapper + ' span.left,'+ logoWrapper + ' span.right,'+ logoWrapper + ' span.middle', {height: 0});
    tl.set(logoWrapper + ' span.text', {autoAlpha: 0, x: -10});
    tl.to(logoWrapper, .5, {y: 0, autoAlpha: 1, delay: .5});
    tl.to('#logo', .7, {y: 0, autoAlpha: 1, delay: .5});
    tl.to(logoWrapper + ' span.top,'+ logoWrapper + ' span.bottom', .7, {
        width: '100%',
        autoAlpha: 1,
        delay: .8
    }, 0);
    tl.to(logoWrapper + ' span.left,'+ logoWrapper + ' span.right', .7, {
        height: '100%',
        autoAlpha: 1,
        delay: .8
    }, 0);
    tl.to(logoWrapper + ' span.middle', .7, {height: '100%', autoAlpha: 1, delay: 1}, 0);
    tl.to(logoWrapper + ' span.text', .7, {autoAlpha: 1, x: 0, delay: 1.5}, 0);
    tl.to(logoWrapper, 1, {autoAlpha: 0, delay: 2.5}, 0);
    tl.set(logoWrapper, {margin: 0});
    tl.set(logoWrapper + ' span.text,'+ logoWrapper + ' span.right', {autoAlpha: 0});
    tl.set(logoWrapper + ' span.top,'+ logoWrapper + ' span.bottom', {
        width: '75px',
        right: 'auto',
        left: 0
    });
    tl.set(logoWrapper + ' span.middle', {left: '75px'});
    tl.set(logoWrapper + ' i', {marginLeft: '10px'});
    tl.set('body', {overflowY: 'auto', delay: 3},0);
    tl.play();
}


