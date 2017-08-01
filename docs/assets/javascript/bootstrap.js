
$(function(){
    var $sections = $('.content');
    var $navElem = $('#nav');
    var $itemLinks = $('a');

    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();
        var $currentSection;

        if(currentScroll > 230) {
            $navElem.addClass('fixed');
        } else if (currentScroll < 230) {
            $navElem.removeClass('fixed');
        }

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
    });

    $itemLinks.on('click', function() {
        var sectionId = $(this).data("item");
        $('html,body').animate({
                scrollTop: $("#"+sectionId).offset().top - 150
         },'fast');
    });
});