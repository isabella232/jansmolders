var sha;
var owner =  $('#owner').val();
var passwrd =  $('#passwrd').val();
var repo =  $('#repo').val();
var path = $('#path').val();
var alert = $('.alert');

$(function(){
    $('#ghsubmitbtn').on('click', function(e){
        e.preventDefault();

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
                sha = data.sha;
                var decodedJson = atob(jsonFile);
                var parsedDecodedJson = JSON.parse(decodedJson);
                $('#login').hide();
                alert.addClass('hidden');
                parseData(parsedDecodedJson);
            },
            error: function(error){
                alert.addClass('alert-danger').removeClass('hidden').html('Something went wrong:'+error.responseText);
            }
        });
    });
});

function parseData(item){
    var resultEl =  $('#results');
    var prefix;
    var languages = Object.keys(item);
    if(languages){
        for (var i = 0; i < languages.length; i++) {
            var langCount = i;
            var landKey = languages[i];

            $.each(item, function (index, locales) {
                if (index === landKey) {
                    resultEl.append('<div class="lang-container lang' + langCount + '"></div>');
                    var langContainer = $(".lang" + langCount);
                    langContainer.append('<h2>'+landKey.toUpperCase() + '</h2>');
                    var pages = locales.pages;
                    if (pages) {
                        var page = Object.keys(pages);
                        langContainer.append('<h2>' + page + '</h2>');
                        $.each(pages, function (index, pageData) {
                            var sections = Object.keys(pageData);
                            for (var j = 0; j < sections.length; j++) {
                                var section = sections[j];
                                prefix = landKey + '.pages.' + page + '.' + section;
                                $.each(pageData, function (index, sectionData) {
                                    if (index === section) {
                                        langContainer.append('<h3>' + section.toUpperCase() + '</h3>');
                                        var sectionHeaders = Object.keys(sectionData);
                                        for (var k = 0; k < sectionHeaders.length; k++) {
                                            var subSectionHeader = sectionHeaders[k];
                                            langContainer.append('<h4>' + sectionHeaders[k] + '</h4>');
                                            $.each(sectionData, function (index, data) {
                                                if (index === sectionHeaders[k]) {
                                                    traverseDownTree(langContainer, prefix+'.'+subSectionHeader, index, data);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            resultEl.append('<button class="btn btn-lg btn-primary" type="submit">Opslaan</button>');
                        });
                    }
                }
            });

        }
    }


    resultEl.submit( function( e ) {
        e.preventDefault();
        var obj = $(this).serializeObject();
        var api = new GithubAPI({token: '473ecd9560dd252f252c06e65dbc7628c0bffc7a'});
        var blob = JSON.stringify(obj, null, 2);

        api.setRepo(owner, repo);
        api.setBranch('gh-pages');
        setTimeout(function () {
            api.pushFiles(
                'CMS Update',
                [
                    {content: blob, path: path}
                ]
            );

            $(this).hide();
        }, 2000)

    });

}

function traverseDownTree(container, prefix, index, data){
    if(typeof data === 'string') {
        createFields(container, prefix, index, data);
    } else if(typeof data === 'object'){
        $.each(data, function (index, data) {
            if(typeof data === 'string') {
                createFields(container, prefix, index, data);
            } else {
                traverseDownTree(container, prefix+'.'+index, index, data);
            }
        });
    }
}

function createFields(container, rootpath, index, item) {
    var uniqueID = Math.floor(Math.random() * 1000000000);
    if(index === 'description' || index === 'text' || index === 'textarea') {
        container.append('<div class="form-group">\n' +
            '<label for="content'+index+uniqueID+'">'+index+'</label>\n' +
            '<textarea name="'+rootpath+'.'+index+'" id="content'+index+uniqueID+'" class="form-control">'+$( $.parseHTML(item) ).text()+'</textarea>\n' +
            '</div>');
    } else {
        container.append('<div class="form-group">\n' +
            '<label for="content' + index + uniqueID + '">' + index + '</label>\n' +
            '<input name="'+rootpath+'.'+index+'" value="' + $( $.parseHTML(item) ).text() + '" id="content' + index + uniqueID + '" class="form-control" />\n' +
            '</div>');
    }
}

$.fn.serializeObject = function() {
    var o = {}; // final object
    var a = this.serializeArray(); // retrieves an array of all form values as

    $.each(a, function() {
        var ns = this.name.split("."); // split name to get namespace
        AddToTree(o, ns, this.value); // creates a tree structure
                                      // with values in the namespace
    });

    return o;
};

function AddToTree(obj, keys, def) {
    for (var i = 0, length = keys.length; i < length; ++i)
        obj = obj[keys[i]] = i == length - 1 ? def : obj[keys[i]] || {};
};

