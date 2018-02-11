$(function(){
    $('#ghsubmitbtn').on('click', function(e){
        e.preventDefault();

        var owner =  $('#owner').val();
        var passwrd =  $('#passwrd').val();
        var repo =  $('#repo').val();
        var path = $('#path').val();
        var level = 0;

        $.ajax({
            url: "https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+path,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "user" + btoa(owner+":"+passwrd));
            },
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                var jsonFile = data.content;
                var decodedJson = atob(jsonFile);
                var parsedDecodedJson = JSON.parse(decodedJson);
                $('#login').hide();
                parseData(parsedDecodedJson);
            },
            error: function(error){
                console.log("Cannot get data", error);
            }
        });
    });
});

function parseData(item){
    //level++;
    //build dom
    var resultEl =  $('#results');

    var languages = Object.keys(item);
    if(languages){
        for (var i = 0; i < languages.length; i++) {
            var langCount = i;
            var landKey = languages[i];

            $.each(item, function (index, locales) {
                if (index === landKey) {

                    resultEl.append('<div class="lang-container lang' + langCount + '"></div>');
                    var langContainer = $(".lang" + langCount);
                    langContainer.append('<h2>Taal: ' + landKey.toUpperCase() + '</h2>');

                    var pages = locales.pages;
                    if (pages) {
                        var page = Object.keys(pages);
                        langContainer.append('<h2>' + page + '</h2>');


                        $.each(pages, function (index, pageData) {

                            var sections = Object.keys(pageData);

                            for (var j = 0; j < sections.length; j++) {
                                var section = sections[j];

                                $.each(pageData, function (index, sectionData) {
                                    if (index === section) {
                                        langContainer.append('<h3>' + section.toUpperCase() + '</h3>');
                                        $.each(sectionData, function (index, sectionelemData) {
                                            if(typeof sectionelemData === 'string'){
                                                createFields(langContainer, landKey+'.'+page+'.'+section, index, sectionelemData);
                                            } else {
                                                for (var k = 0; k < sectionelemData.length; k++) {

                                                }
                                            }

                                        });
                                    }
                                });


                            }

                            resultEl.append('<button type="submit">Opslaan</button>');

                        });
                    }
                }
            });

        }
    }


    $( "#results" ).submit( function( e ) {
        e.preventDefault();
        var formData = $(this).serializeArray();
        console.log(formData);

    });


}

function createFields(container, rootpath, index, item) {
    var uniqueID = Math.floor(Math.random() * 1000000000);
    if(index === 'description') {
        container.append('<div class="form-group">\n' +
            '<label for="content'+index+uniqueID+'">'+index+'</label>\n' +
            '<textarea name="'+rootpath+'.'+index+'" id="content'+index+uniqueID+'" class="form-control">'+item+'</textarea>\n' +
            '</div>');
    } else {
        container.append('<div class="form-group">\n' +
            '<label for="content' + index + uniqueID + '">' + index + '</label>\n' +
            '<input name="'+rootpath+'.'+index+'" value="' + item + '" id="content' + index + uniqueID + '" class="form-control" />\n' +
            '</div>');
    }
}










function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}