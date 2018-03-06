var projectDetail;
$(function(){
    var userLang = navigator.language || navigator.userLanguage;
    var activeCookie = getCookie('lang');
    if(activeCookie === undefined){
        if(userLang.match(/en/g)){
            setCookie('lang','en',7);
        } else if (userLang.match(/de/g)){
            setCookie('lang','en',7);
        } else if (userLang.match(/nl/g)) {
            setCookie('lang','nl',7);
        } else {
            setCookie('lang','nl',7);
        }
    }


    $('#nav li .loc').on('click', function(e) {
        e.preventDefault();
        var link = $(this).attr('href');
        eraseCookie('lang');
        setCookie('lang',link,7);
        window.location.reload();
    });

    if(activeCookie !== undefined) {
        $('#nav .active-loc').html(activeCookie);
    }



    var url = './assets/json/content.json';
    var $body = $("body");
    $.getJSON(url, function(data) {
        var loc = getCookie('lang');
        var homepage = data[loc].pages.homepage;
        var header = homepage.header.content;
        var intro = homepage.content.intro;
        var brands = intro.images;
        var about = homepage.content.about;
        var aboutUs = homepage.content.aboutUs;
        var values = homepage.content.values;
        var method = homepage.content.method;
        var projects = homepage.content.projects;
        var footer = homepage.content.footer;


        if (header) {
            $('.background-video').css({'backgroundImage': header.backgroundImageSrc});
            $('.youtube-video-embed iframe').attr('id', header.youtubeURL).attr('src', 'https://www.youtube.com/embed/' + header.youtubeURL + '?autoplay=0&rel=0&fs=1&enablejsapi=1')
            $('video source#mp4').attr('src', header.backgroundVideoMp4Src);
            $('video source#webm').attr('src', header.backgroundVideoWebMSrc);
            $body.find("[data-content='header-content-title']").html(header.title);
        }

        if (intro) {
            $body.find("[data-content='content-intro-title']").html(intro.title);
            $body.find("[data-content='content-intro-desc']").html(intro.description);

            if($('.brandlist').length > 0){
                $.each(brands, function (index, brand) {
                    $body.find('.brandlist').append('<li><img src="'+brand.image.src+'" alt="'+brand.image.alt+'" /></li>');
                });
            }

        }

        if (about) {
            $body.find("[data-content='content-about-row1-title']").html(about.row1.title);
            $body.find("[data-content='content-about-row1-image']").css({'backgroundImage': about.row1.image.src});
            $body.find("[data-content='content-about-row1-desc']").html(about.row1.description);

            $body.find("[data-content='content-about-row2-title']").html(about.row2.title);
            $body.find("[data-content='content-about-row2-image']").css({'backgroundImage': about.row2.image.src});
            $body.find("[data-content='content-about-row2-desc']").html(about.row2.description);
        }

        if (aboutUs) {
            $body.find("[data-content='content-aboutUs-title']").html(aboutUs.title);
            $body.find("[data-content='content-aboutUs-description']").html(aboutUs.description);

            $body.find("[data-content='content-employee-niek-image']").attr('src', aboutUs.employees.niek.image.src).attr('alt', aboutUs.employees.niek.image.alt);
            $body.find("[data-content='content-employee-niek-title']").html(aboutUs.employees.niek.title);
            $body.find("[data-content='content-employee-niek-desc']").html(aboutUs.employees.niek.description);

            $body.find("[data-content='content-employee-jan-image']").attr('src', aboutUs.employees.jan.image.src).attr('alt', aboutUs.employees.jan.image.alt);
            $body.find("[data-content='content-employee-jan-title']").html(aboutUs.employees.jan.title);
            $body.find("[data-content='content-employee-jan-desc']").html(aboutUs.employees.jan.description);
        }

        if (values) {
            $body.find("[data-content='content-values-image']").css({'backgroundImage': values.image.src});
            $body.find("[data-content='content-values-title']").html(values.title);
            $body.find("[data-content='content-values-desc']").html(values.description);

            $body.find("[data-content='content-value1']").html(values.values.value1);
            $body.find("[data-content='content-value2']").html(values.values.value2);
            $body.find("[data-content='content-value3']").html(values.values.value3);
            $body.find("[data-content='content-value4']").html(values.values.value4);
            $body.find("[data-content='content-value5']").html(values.values.value5);
            $body.find("[data-content='content-value6']").html(values.values.value6);
        }

        if (method) {
            $body.find("[data-content='content-method-title']").html(method.title);
            $body.find("[data-content='content-method-desc']").html(method.description);

            $body.find("[data-content='content-method-intro-title']").html(method.method.intro.title);
            $body.find("[data-content='content-method-intro-desc']").html(method.method.intro.desc);

            $body.find("[data-content='content-method-design-title']").html(method.method.design.title);
            $body.find("[data-content='content-method-design-desc']").html(method.method.design.desc);

            $body.find("[data-content='content-method-tuning-title']").html(method.method.tuning.title);
            $body.find("[data-content='content-method-tuning-desc']").html(method.method.tuning.desc);

            $body.find("[data-content='content-method-construction-title']").html(method.method.intro.title);
            $body.find("[data-content='content-method-construction-desc']").html(method.method.intro.desc);

            $body.find("[data-content='content-method-eval-title']").html(method.method.intro.title);
            $body.find("[data-content='content-method-eval-desc']").html(method.method.intro.desc);
        }

        if (projects) {
            $body.find("[data-content='content-projects-title']").html(projects.title);
            $body.find("[data-content='content-projects-desc']").html(projects.description);
            $body.find("[data-content='content-projects-quote']").html(projects.quote);
            $body.find("[data-content='content-projects-author']").html(projects.author);
            $body.find("[data-content='content-projects-button']").html(projects.button.label);
            $body.find("[data-content='content-comparison-before']").attr('src', projects.comparison.before);
            $body.find("[data-content='content-comparison-after']").css({'backgroundImage': projects.comparison.after});

            $body.find("[data-content='content-project1-image']").attr('src', projects.project1.image.src).attr('alt', projects.project1image.alt);
            $body.find("[data-content='content-project1-title']").html(projects.project1.title);
            $body.find("[data-content='content-project1-desc']").html(projects.project1.description);

            $body.find("[data-content='content-project2-image']").attr('src', projects.project2.image.src).attr('alt', projects.project2.image.alt);
            $body.find("[data-content='content-project2-title']").html(projects.project2.title);
            $body.find("[data-content='content-project2-desc']").html(projects.project2.description);
        }

        if (footer) {
            $body.find("[data-content='footer-testimonials-title']").html(footer.testimonials.title);
            $body.find("[data-content='footer-contacts-header']").html(footer.contacts.header);

            $body.find("[data-content='footer-contacts-jan-title']").html(footer.contacts.jan.title);
            $body.find("[data-content='footer-contacts-jan-email']").attr('href', footer.contacts.jan.links.email.src).html(footer.contacts.jan.links.email.title);
            $body.find("[data-content='footer-contacts-linkedin-jan']").attr('href', footer.contacts.jan.links.linkedin.src);
            $body.find("[data-content='footer-contacts-linkedin-jan-title']").attr('href', footer.contacts.jan.links.linkedin.title);
            $body.find("[data-content='footer-contacts-call-jan-phone']").attr('href', footer.contacts.jan.phone);

            $body.find("[data-content='footer-contacts-niek-title']").html(footer.contacts.niek.title);
            $body.find("[data-content='footer-contacts-niek-email']").attr('href', footer.contacts.niek.links.email.src).html(footer.contacts.niek.links.email.title);
            $body.find("[data-content='footer-contacts-linkedin-niek']").attr('href', footer.contacts.niek.links.linkedin.src);
            $body.find("[data-content='footer-contacts-linkedin-niek-title']").attr('href', footer.contacts.niek.links.linkedin.title);
            $body.find("[data-content='footer-contacts-call-niek-phone']").attr('href', footer.contacts.niek.phone);

            $body.find("[data-content='footer-contacts-call-header]").attr('href', footer.call.header);
            $body.find("[data-content='footer-contacts-visit-header]").attr('href', footer.contacts.visit.header);

            $body.find("[data-content='footer-contacts-visit-desc]").attr('href', footer.contacts.visit.description);
            $body.find("[data-content='footer-copyright-desc]").attr('href', footer.copyright.description);
        }

    });

});


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}