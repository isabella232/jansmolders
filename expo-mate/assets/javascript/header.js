$(function () {
    var navIsOpen = false
        , mobileNav = $('#nav ul')
        , hamburgerElem = $('.hamburger');

    $('#nav li a').on('click', function(e){
        e.preventDefault();
        var link = $(this).attr('href');

        if(link === '#footer'){
            var linkPos = $(link).offset().top;
            $("html, body").animate({ scrollTop: linkPos });
        } else {
            window.location.href = '/'+link;
        }

        if (navIsOpen) {
            hamburgerElem.removeClass("is-active");
            mobileNav.removeClass("open");
        }
    });
});