$(function () {
    // Show intro
    $(document).scrollTop(0, 0);
    setTimeout(function () {
        introAnimation();
    }, 100);

    var heroTop = document.getElementById ( 'hero' ).offsetTop;
    var heroLeft = document.getElementById ( 'hero' ).offsetLeft;
    var parallaxBox = document.getElementById ( 'epic' );

    parallaxBox.onmousemove = function ( event ) {
        event = event || window.event;
        var x = event.clientX - parallaxBox.offsetLeft,
            y = event.clientY - parallaxBox.offsetTop;
        mouseParallax ('hero', heroLeft, heroTop, x, y, 10);
    };

});

function mouseParallax ( id, left, top, mouseX, mouseY, speed ) {
    var obj = document.getElementById (id);
    var parentObj = obj.parentNode,
        containerWidth = parseInt( parentObj.offsetWidth ),
        containerHeight = parseInt( parentObj.offsetHeight );
    obj.style.left = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
    obj.style.top = top - ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + 'px';
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

            animateSection();
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


function animateSection(){
    var tl2 = new TimelineMax({
        paused: true,
        onComplete: function () {

        }
    });
    tl2.set('#hero', {autoAlpha: 0, x: -50});
    tl2.set('.ribbon span', {autoAlpha: 0, x: 50});
    tl2.set('.ribbon h2', {autoAlpha: 0, x: 50});
    tl2.set('.work', {autoAlpha: 0, x: 10});
    tl2.to('#hero', .5, {autoAlpha: .8, x: 0, delay: .5});
    tl2.to('.ribbon span', .3, {autoAlpha: 1, x: 0, delay: .1},0);
    tl2.to('.ribbon h2', .3, {autoAlpha: 1, x: 0, delay: .2},0);
    tl2.to('.work', .3, {autoAlpha: 1, x: 0, delay: .2},0);
    tl2.play();

}