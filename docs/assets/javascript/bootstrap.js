
$(function(){
    var $sections = $('.content');
    var $navElem = $('#sideNav');
    var $itemLinks = $('#sideNav a');
    var didClick = false;
    var $searchInput = $('.searchInput');
    var $searchResults = $('.search-results');
    $searchInput.val('');

    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();
        var $currentSection;

        if(currentScroll > 230) {
            $navElem.addClass('fixed');
        } else if (currentScroll < 230) {
            $navElem.removeClass('fixed');
        }

        if(!didClick) {
            $sections.each(function(){
                var divPosition = $(this).offset().top;
                if( divPosition - 160 < currentScroll ){
                    $currentSection = $(this);

                    $itemLinks.each(function(){
                        if($(this).hasClass('active') && $(this).data("item") !== $currentSection.attr('id')){
                            $(this).removeClass('active');
                        }
                        if ($(this).data("item") === $currentSection.attr('id')) {
                            $(this).addClass('active');
                        }
                    });
                }
            });
        }

    });

    $itemLinks.on('click', function(e) {
        e.preventDefault();
        didClick = true;
        var sectionId = $(this).data("item");
        $('a.links').removeClass('active');
        $(this).addClass('active');
        $('html,body').animate({
                scrollTop: $("#"+sectionId).offset().top - 20
         }, 600);

        setTimeout(function(){
            didClick = false;
        },650)
    });

    $searchInput.on('input', function(e) {
        var InputVal = $(this).val();

        if(InputVal.length > 0){
            $(this).addClass('typing');
        } else {
            $(this).removeClass('typing');
        }

        if(InputVal === 'blueprint'){
            $searchResults.removeClass('landscape');
            $searchResults.addClass('open').addClass('blueprint');
        }  else if (InputVal === 'landscape') {
            $searchResults.removeClass('blueprint');
            $searchResults.addClass('open').addClass('landscape');
        } else if (InputVal === '') {
            $searchResults.removeClass('open').removeClass('blueprint').removeClass('landscape');
        }
    });

    $('a.finish').on('click', function(e) {
        e.preventDefault();
        $(this).addClass('done');
        var id = $(this).parents('.content').attr('id');
        $itemLinks.each(function(){
            if($(this).data("item") === id) {
                $(this).addClass("done");
            }
        });
    });
});