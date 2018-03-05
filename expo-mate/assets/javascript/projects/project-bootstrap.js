$(function(){
    // Load projects
    if ($('body').hasClass('projects')){
        var url = './assets/json/content.json';
        var $body = $("body");
        $.getJSON(url, function(data) {
            var loc = getCookie('lang');
            var projectDetail = data[loc].pages.projects;
            var section = $('#projects .projects-wrapper');

            $.each(projectDetail, function (index, item) {
                var imageArray = [];
                var imageContent = item.images;
                var count = parseInt(index) + 1;
                if (imageContent && imageContent.length > 0) {
                    $.each(imageContent, function (index, item) {
                        if(item){
                            imageArray.push('<img src="'+item.src+'" alt="'+item.alt+'" />')
                        }
                    });
                }

                section.append('<div class="project" id="project'+count+'">\n' +
                    '               <div class="project-close"></div>\n' +
                    '               <div class="project-images">\n' +
                    '                  <div class="slider slider-for">'+imageArray.join("")+'</div>\n' +
                    '                  <div class="slider slider-nav">'+imageArray.join("")+'</div>\n' +
                    '               </div>\n' +
                    '               <div class="project-desc-wrapper">\n' +
                    '                  <div class="project-desc-content">\n' +
                    '                      <div class="project-header">\n' +
                    '                          <h2 class="project-title">'+item.title+'</h2>\n' +
                    '                          <div class="project-sub-title">'+item.subTitle+'</div>\n' +
                    '                      </div>\n' +
                    '                      <div class="project-desc">'+item.description+'</div>\n' +
                    '                  </div>' +
                    '               </div>' +
                    '            </div>');


                $('.project-images').on('click', function(){
                    $(this).parent('.project').addClass('open');
                    $('body').addClass('open');
                    sliderInit();
                });

                $('.project-close').on('click', function() {
                    $('body').removeClass('open');
                    $(this).parent('.project').removeClass('open');
                    var parentID = $(this).parent('.project').attr('id');
                    $('.slider-for').slick('unslick');
                    $('.slider-nav').slick('unslick');
                    document.location.href="#"+parentID;
                });


            });
        });
    }
});


function sliderInit(){
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        asNavFor: '.slider-for',
        dots: false,
        focusOnSelect: true
    });
}

