

// jQuery bootstrap

$(function () {
    //********* Const
    var lastScrollTop = 0
        , hasScrolled = false
        , headerElem = $('#header')
        , isHomePage = $('body.homepage')
        , viewPortHeight = $(window).height()
        , viewPortWidth = $(window).width()
        , animationIncrements = 950
        , step = 0
        , scroll = 0
        , hasSnapped = false
        , navIsOpen = false
        , viewPortOffset = $(window).scrollTop()
        , mobileNav = $('#nav ul')
        , methodItem = $('.method-item')
        , methodContent = $('.fadeIn')
        , isMobile = window.orientation > -1 && screen.width <= 640
        , hamburgerElem = $('.hamburger');

    fixNav(viewPortOffset);



    //********* Event Handlers

    $('.close-btn').on('click', function(){
        $('body').toggleClass('isPlaying');
        headerElem.removeClass('play');
        headerElem.find('.video-container').removeClass('play');
    });

    $('.contact-btn').on('click', function(){
        var footerOffset = $('footer').offset().top;
        $("html, body").animate({ scrollTop: footerOffset });
    });



    $('#nav li a').on('click', function(e){
        e.preventDefault();
        var link = $(this).attr('href');

        if(isHomePage.length > 0){
            var linkPos = $(link).offset().top;
            $("html, body").animate({ scrollTop: linkPos });
        } else {
            window.location.href = link;
        }

        if (navIsOpen) {
            hamburgerElem.removeClass("is-active");
            mobileNav.removeClass("open");
            navIsOpen = false;
        }
    });

    $(window).on('mousewheel DOMMouseScroll touchmove', function() {
        hasScrolled = true;
    });

    $(window).on('resize', function(){
        viewPortHeight = $(this).height();
        viewPortWidth = $(this).width();
        animationIncrements = $(window).height() / 100 * 20;
    });



    if(isHomePage !== undefined && isHomePage.length > 0){
        var methodContainer = $('#method')
            , methodScrollContainer = $('.method-scroll-wrapper')
            , methodContainerHeight = methodContainer.height()
            , methodContainerOffset = methodContainer.offset().top
            , CaseStudyContainer = $('#case-studies')
            , CaseStudyContainerOffset = ~~CaseStudyContainer.offset().top
            , aboutContainer = $('#about')
            , preAboutContainer = $('#preabout')
            , preAboutContainerOffset = preAboutContainer.offset().top
            , aboutContainerOffset = aboutContainer.offset().top;

        if (~~viewPortOffset >= ~~methodContainerOffset) {
            methodContainer.addClass('show');
        }

        if (~~viewPortOffset >= ~~aboutContainerOffset || ~~viewPortOffset >= ~~preAboutContainerOffset) {
            aboutContainer.addClass('show');
        }

        if(~~viewPortOffset >= ~~CaseStudyContainerOffset){
            CaseStudyContainer.addClass('show');
        }

        $('.play-video-wrapper').on('click', function(){
            $('body').toggleClass('isPlaying');
            headerElem.addClass('play');
            headerElem.find('.video-container').addClass('play');
        });

        $('.toggle-about').on('click', function(e){
            e.preventDefault();
            $("#our-people").toggleClass('open');
            $(this).toggleClass('open');
        });


        $('#diagram .method-item').on("mouseenter", function() {
            $(this).addClass('active').find('.fadeIn').addClass('show');
        }).on("mouseleave", function() {
            $(this).removeClass('active').find('.fadeIn').removeClass('show');
        });

        hamburgerElem.click(function(){
            $(this).toggleClass("is-active");
            mobileNav.toggleClass("open");
            navIsOpen = true;
        });

        $(document.body).on('touchmove', function(){
            scroll = ~~$(this).scrollTop();
            $('#case-studies').addClass('show');
            aboutContainer.addClass('show');
        });

        $(window).on('scroll', function(){
            scroll = ~~$(this).scrollTop();

            if(viewPortHeight < 1100){
                animationIncrements = 1050;
            }
            getDirection(scroll, lastScrollTop, function(direction, scroll){
                lastScrollTop = scroll;

                fixNav(scroll);
                if(scroll && hasScrolled && !isMobile && viewPortWidth > 1200) {
                    if(direction === 'down') {
                        //on
                        if (scroll >= methodContainerOffset) {
                            if (!hasSnapped) {
                                methodContent.removeClass('show');
                                methodItem.removeClass('active');
                                methodScrollContainer.addClass('fixed');
                            }
                            hasSnapped = true;
                        }

                        if (isElementInViewport(CaseStudyContainer) || scroll >= methodContainerOffset + methodContainerHeight) {
                            $('#case-studies').addClass('show');
                            methodContent.removeClass('show');
                            methodItem.removeClass('active');
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
                                methodItem.removeClass('active');
                                methodScrollContainer.addClass('fixed');
                            }
                            hasSnapped = true;
                        }

                        if (scroll <= methodContainerOffset) {
                           // $('#case-studies').addClass('active');
                        }

                        if (scroll <= methodContainerOffset ) {
                            methodContent.removeClass('active');
                            methodItem.removeClass('active');
                            methodScrollContainer.removeClass('fixed');
                            hasSnapped = false;
                        }
                    }

                    if(hasSnapped) {
                        if (scroll > methodContainerOffset && scroll < methodContainerOffset + animationIncrements) {
                            step = 1;
                        } else if (scroll > methodContainerOffset + animationIncrements && scroll < methodContainerOffset + animationIncrements * 2) {
                            step = 2;
                        } else if (scroll > methodContainerOffset + animationIncrements * 2 && scroll < methodContainerOffset + animationIncrements * 3) {
                            step = 3;
                        } else if (scroll > methodContainerOffset + animationIncrements * 3 && scroll < methodContainerOffset + animationIncrements * 4) {
                            step = 4;
                        } else if (scroll > methodContainerOffset + animationIncrements * 4 && scroll < CaseStudyContainerOffset) {
                            step = 5;
                        }

                        handleMethodScroll(step);
                    }

                }
            });
        });
    }
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
    var toggleClassName = 'active'
        , fadeInElemClass = '.fadeIn'
        , methodElem = '.method-item'
        , introElemClass = '.intro'
        , designElemClass = '.design'
        , tuningElemClass = '.tuning'
        , constructionElemClass = '.construction'
        , evalElemClass = '.eval';

    $(fadeInElemClass).removeClass(toggleClassName);
    $(methodElem).removeClass(toggleClassName);

    if(step === 1){
        $(fadeInElemClass+introElemClass).addClass(toggleClassName);
        $(methodElem+introElemClass).addClass(toggleClassName);
    } else if(step === 2) {
        $(methodElem+introElemClass).addClass(toggleClassName);
        $(fadeInElemClass+designElemClass).addClass(toggleClassName);
        $(methodElem+designElemClass).addClass(toggleClassName);
    } else if(step === 3) {
        $(methodElem+introElemClass).addClass(toggleClassName);
        $(methodElem+designElemClass).addClass(toggleClassName);
        $(fadeInElemClass+tuningElemClass).addClass(toggleClassName);
        $(methodElem+tuningElemClass).addClass(toggleClassName);
    } else if(step === 4) {
        $(methodElem+introElemClass).addClass(toggleClassName);
        $(methodElem+designElemClass).addClass(toggleClassName);
        $(methodElem+tuningElemClass).addClass(toggleClassName);
        $(fadeInElemClass+constructionElemClass).addClass(toggleClassName);
        $(methodElem+constructionElemClass).addClass(toggleClassName);
    } else if(step === 5) {
        $(methodElem+introElemClass).addClass(toggleClassName);
        $(methodElem+designElemClass).addClass(toggleClassName);
        $(methodElem+tuningElemClass).addClass(toggleClassName);
        $(methodElem+constructionElemClass).addClass(toggleClassName);
        $(fadeInElemClass+evalElemClass).addClass(toggleClassName);
        $(methodElem+evalElemClass).addClass(toggleClassName);
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