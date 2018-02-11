$(function(){
    var url = './assets/json/content.json';
    $.getJSON(url, function(data) {
        var homepage = data.en.homepage;
        var introSection = homepage.content.intro;
        var aboutSection = homepage.content.about;
        var fundamentSection = homepage.content.fundament;
        var $body = $("body");

        $body.find("[data-content='header-title']").html(homepage.header.title);
        $body.find("[data-content='header-button']").html(homepage.header.button);
        $body.find("[data-content='intro-title']").html(introSection.title);
        $body.find("[data-content='intro-desc']").html(introSection.description);


        var imageContent = introSection.images;
        var imageList = [];
        for (i = 0; i < imageContent.length; i++) {
            imageList.push('<li><img src="' + imageContent[i].src + '" alt="' + imageContent[i].alt + '" /></li>');
        }

        $body.find("[data-content='intro-images']").html(imageList);

        $body.find("[data-content='intro-buttons-off']").html(introSection.buttons[0]);
        $body.find("[data-content='intro-buttons-on']").append(introSection.buttons[1]);

        var employeesContent = aboutSection.employees;
        var employeesList = [];
        for (i = 0; i < employeesContent.length; i++) {
            employeesList.push('<div class="col-xs-12 col-md-6">\n' +
                '                        <div class="image-container">\n' +
                '                            <img src="' + employeesContent[i].image.src + '" alt="' + employeesContent[i].image.alt + '" />\n' +
                '                        </div>\n' +
                '                        <div class="desc">\n' +
                '                            <h2 class="left-aligned">' + employeesContent[i].title + '</h2>\n' +
                '                            <p>' + employeesContent[i].description + '</p>\n' +
                '                        </div></div>');
        }
        $body.find("[data-content='employees']").html(employeesList);
    });

});
