$(function(){
    var userLang = navigator.language || navigator.userLanguage;
    if(getCookie('lang') === undefined){
        if(userLang.match(/en/g)){
            setCookie('lang','en',7);
        } else if (userLang.match(/de/g)){
            setCookie('lang','en',7);
        } else if (userLang.match(/nl/g)) {
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

    var url = './assets/json/content.json';
    var $body = $("body");
    $.getJSON(url, function(data) {
        var loc = getCookie('lang');
        var homepage = data[loc].pages.homepage;
        var header = homepage.header.content;
        var intro = homepage.content.intro;
        var about = homepage.content.about;

        if(header){
            $('.background-video').css({'backgroundImage': header.backgroundImageSrc});
            $('.youtube-video-embed iframe').attr('id', header.youtubeURL).attr('src','https://www.youtube.com/embed/'+ header.youtubeURL+'?autoplay=0&rel=0&fs=1&enablejsapi=1')
            $('video source#mp4').attr('src',header.backgroundVideoMp4Src);
            $('video source#webm').attr('src',header.backgroundVideoWebMSrc);
            $body.find("[data-content='header-content-title']").html(header.title);
        }

        if(intro){
            $body.find("[data-content='content-intro-title']").html(intro.title);
            $body.find("[data-content='content-intro-desc']").html(intro.description);

            $body.find("[data-content='content-intro-image1']").attr('src',intro.images.image1.src).attr('alt',intro.images.image1.alt);
            $body.find("[data-content='content-intro-image2']").attr('src',intro.images.image2.src).attr('alt',intro.images.image2.alt);
            $body.find("[data-content='content-intro-image3']").attr('src',intro.images.image3.src).attr('alt',intro.images.image3.alt);
            $body.find("[data-content='content-intro-image4']").attr('src',intro.images.image4.src).attr('alt',intro.images.image4.alt);
            $body.find("[data-content='content-intro-image5']").attr('src',intro.images.image5.src).attr('alt',intro.images.image5.alt);
        }

        if(about){
            $body.find("[data-content='content-about-row1-title']").html(about.row1.title);
            $body.find("[data-content='content-about-row1-image']").css({'backgroundImage': about.row1.image.src});
            $body.find("[data-content='content-about-row1-desc']").html(about.row1.description);

            $body.find("[data-content='content-about-row2-title']").html(about.row2.title);
            $body.find("[data-content='content-about-row2-image']").css({'backgroundImage': about.row2.image.src});
            $body.find("[data-content='content-about-row2-desc']").html(about.row2.description);
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