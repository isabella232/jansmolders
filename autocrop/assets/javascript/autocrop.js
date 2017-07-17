$(function(){

    //
    // Drag and drop image handler and image loading
    //

    $('html')
        .on('dragover', function(e) {
            e.preventDefault(); return false;
            $(this).addClass('dragover');
        })
        .on('drop', function(e) {
            $(this).removeClass('dragover');
            var files = e.originalEvent.dataTransfer.files;
            handleFiles(files);
            return false;
        });

    $('input[type=file]').change(function(e) { handleFiles(this.files); });

    $.each(dimensions, function( key, dimension) {
        var name = key.toUpperCase().replace(/_/g,' ');
        $('#dimensionPicker').append('<div class="checkbox" style="width:300px; margin:5px 0;"><label><input type="checkbox" id="'+key+'" name="'+key+'"> '+name +' <span style="float:right;">'+dimension.width+'x'+dimension.height+'</span></label></div>');
    });


    function handleFiles(files) {
        if (files.length > 0) {
            $('.loading').removeClass('hidden').text('Analysing, Please Wait...');
            var file = files[0];
            if (typeof FileReader !== 'undefined' && file.type.indexOf('image') != -1) {
                var reader = new FileReader();
                reader.onload = function(evt) {
                    load(evt.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    function load(src) {
        img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
            run(src);
        };
        img.src = src;
    }

    //
    // Inspect selected image and match with user chosen settings
    //

    function run(src) {
        if (!img) return;
        $(".resultWrapper").empty();

        var loading = false;
        var showAlert = false;

        $.each(dimensions, function( key, dimension ) {
            var isChecked = $('#dimensionPicker').find('input#'+key).prop('checked');
            var width = dimension.width;
            var height = dimension.height;
            var options = {
                width: width,
                height: height,
                ruleOfThirds: true,
                minScale: 1,
                debug: false
            };

            if(isChecked){
                var name = key
                    , splitName = name.split("_")
                    , isSony = false
                    , isYoutube = false
                    , isSkin = false
                    , skinName = ''
                    , sonyAlignment = false
                    , loading = true;

                for (i = 0; i < splitName.length; i++) {
                    if(splitName[i] === 'youtube'){
                        isYoutube = true;
                    } else if(splitName[i] === 'sony'){
                        isSony = true;
                    } else if(splitName[i] === 'skin'){
                        isSkin = true;
                        skinName = splitName[1];
                    }
                }

                if(isSony && isYoutube){
                    sonyAlignment = true;
                }

                var imageOptions = {
                    width: width,
                    height: height,
                    language: dimension.language,
                    showText: dimension.showText,
                    showLogo: dimension.showLogo,
                    showPlayButton: dimension.showPlayButton,
                    name: key,
                    isYoutube: isYoutube,
                    isSkin: isSkin,
                    skinName: skinName,
                    sonyAlignment: sonyAlignment,
                    crop: dimension.crop
                };

                analyze(img, options,imageOptions);
            } else if(!loading && !isChecked && !showAlert){
                alert('Pick a dimension first!');
                $('.loading').addClass('hidden');
                showAlert = true;
            }
        });
    }

    //
    // Build Dom based on selection and attach event handlers
    //

    function analyze(img, options,imageOptions) {
        var key = imageOptions.name
            , name = key.toUpperCase().replace(/_/g,' ')
            , imgWidth = imageOptions.width
            , imgHeight = imageOptions.height
            , headerEL = '<h3>' + name + ' <span style="color: #929292;">'+imgWidth +'x'+ imgHeight+'</span></h3>'
            , canvasEl = '<canvas id="' + key + '" class="' + key + '"></canvas>'
            , styling = ' width:' + options.width + 'px; height:' + options.height + 'px'
            , buttonEl = '<a class="btn-lg btn btn-primary download" id="' + key + '">Download</a>'
            , textButtonEl = ''
            , logoButtonEl = ''
            , playButtonEl = ''
            , releaseNoteButton = ''
            , showText = imageOptions.showText
            , showLogo = imageOptions.showLogo
            , showPlayButton = imageOptions.showPlayButton;

        if(showText){
            textButtonEl = '<a class="btn-lg btn btn-primary addText" id="' + key + '">Add Text</a>';
        }

        if(showLogo && !showText){
            logoButtonEl = '<a class="btn-lg btn btn-primary addLogo" id="' + key + '">Add Logo</a>';
        }

        if(showPlayButton){
            playButtonEl = '<a class="btn-lg btn btn-primary addPlayButton" id="' + key + '">Add Play Button</a>';
        }

        if(imageOptions.name  === 'release_notes'){
            releaseNoteButton = '<a class="btn-lg btn btn-primary toggleRu" id="' + key + '">Toggle Language</a>';
        }

        var imageBoxClass = 'image-box ' + key;
        var boxClass = 'col-xs-12 col-centered box';
        var buttonElements = '<div class="button-wrapper">'+buttonEl + textButtonEl + logoButtonEl+ playButtonEl + releaseNoteButton +'</div>';
        var newImageEl = '<div class="' + boxClass + '">' + headerEL + '<div class="' + imageBoxClass + '" style="' + styling + '">' + canvasEl + '</div>' + buttonElements +'</div>';

        $(".resultWrapper").append(newImageEl);
        $('.loading').addClass('hidden');

        var canvas = document.querySelectorAll("canvas#" + key)[0];

        doCrop(img, newImageEl, options, imageOptions, canvas);
    }
});