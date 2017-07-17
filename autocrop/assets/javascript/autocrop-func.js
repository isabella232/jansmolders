var canvasOffset = 80;
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var pi2 = Math.PI * 2;
var resizerRadius = 8;
var rr = resizerRadius * resizerRadius;
var draggingResizer = {
    x: 0,
    y: 0
};
var imageX = 0;
var imageY = 0;
var imageWidth, imageHeight, imageRight, imageBottom;
var draggingImage = false;
var startX;
var startY;

function doCrop(img, newImageEl, options, imageOptions ,canvas){
    smartcrop.crop(img, options, function (result) {
        var $canvas = $(canvas)
        , crop = result.topCrop
        , hasClickedText = false
        , hasClickedLogo = false
        , ctx = canvas.getContext("2d")
        , hasClickedPlayButton = false
        , key = imageOptions.name
        , showRussianReleaseNote = false;

        canvas.width = options.width;
        canvas.height = options.height;

        // Initial Draw
        draw(imageOptions,crop,ctx,canvas, true, true);

        $('a.download#' + key).on('click', function (e) {
            downloadImage(key, options);
        });

        $('a.addText#' + key).on('click', function (e) {
            if (!hasClickedText) {
                hasClickedText = true;
                drawText(imageOptions,crop,ctx,canvas);
            }
        });

        $('a.addLogo#' + key).on('click', function (e) {
            if (!hasClickedLogo) {
                hasClickedLogo = true;
                drawLogo(imageOptions,ctx,canvas);
            }
        });

        $('a.addPlayButton#' + key).on('click', function (e) {
            if (!hasClickedPlayButton) {
                hasClickedPlayButton = true;
                drawPlayButton(imageOptions, ctx);
            }
        });

        $('a.toggleRu#' + key).on('click', function (e) {
            showRussianReleaseNote = !showRussianReleaseNote;
            drawReleaseNote(imageOptions,showRussianReleaseNote,ctx);
        });

        $canvas.mousedown(function (e) {
            handleMouseDown(e);
        });
        $canvas.mousemove(function (e) {
            handleMouseMove(e,imageOptions,crop,ctx,canvas);
        });
        $canvas.mouseup(function (e) {
            handleMouseUp(e,imageOptions,crop,ctx,canvas);
        });
        $canvas.mouseout(function (e) {
            handleMouseOut(e,imageOptions,crop,ctx,canvas);
        });
    });
};
//
// Draw the image
//

function draw(imageOptions,crop,ctx,canvas,withAnchors,withBorders){
    var cropY = crop.y;
    var cropX = crop.x;
    var showGradient = document.getElementById('gradient').checked;

    // optionally draw the draggable anchors
    if (withAnchors) {
        ctx.beginPath();
        ctx.arc(cropX, cropY, resizerRadius, 0, pi2, false);
        ctx.closePath();
        ctx.fill();
    }

    // optionally draw the connecting anchor lines
    if (withBorders) {
        ctx.beginPath();
        ctx.moveTo(imageX, imageY);
        ctx.lineTo(imageRight, imageY);
        ctx.lineTo(imageRight, imageBottom);
        ctx.lineTo(imageX, imageBottom);
        ctx.closePath();
        ctx.stroke();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, cropX, cropY, crop.width, crop.height, imageX, imageY, canvas.width, canvas.height);

    if(showGradient){
        drawGradient(imageOptions, ctx, canvas);
    }

    if(imageOptions.name  === 'release_notes') {
        drawReleaseNote(canvas,imageOptions);
    }
}

function anchorHitTest(x, y) {

    var dx, dy;

    // top-left
    dx = x - imageX;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (0);
    }
    // top-right
    dx = x - imageRight;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (1);
    }
    // bottom-right
    dx = x - imageRight;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (2);
    }
    // bottom-left
    dx = x - imageX;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (3);
    }
    return (-1);

}

function hitImage(x, y) {
    return (x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);
}

function handleMouseDown(e) {
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    draggingResizer = anchorHitTest(startX, startY);
    draggingImage = draggingResizer < 0 && hitImage(startX, startY);
}

function handleMouseUp(e,imageOptions,crop,canvas) {
    draggingResizer = -1;
    draggingImage = false;
    draw(imageOptions,crop,canvas, true, true);
}

function handleMouseOut(e,imageOptions,crop,canvas) {
    handleMouseUp(e,imageOptions,crop,canvas);
}

function handleMouseMove(e,imageOptions,crop,canvas) {

    if (draggingResizer > -1) {

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // resize the image
        switch (draggingResizer) {
            case 0:
                //top-left
                imageX = mouseX;
                imageWidth = imageRight - mouseX;
                imageY = mouseY;
                imageHeight = imageBottom - mouseY;
                break;
            case 1:
                //top-right
                imageY = mouseY;
                imageWidth = mouseX - imageX;
                imageHeight = imageBottom - mouseY;
                break;
            case 2:
                //bottom-right
                imageWidth = mouseX - imageX;
                imageHeight = mouseY - imageY;
                break;
            case 3:
                //bottom-left
                imageX = mouseX;
                imageWidth = imageRight - mouseX;
                imageHeight = mouseY - imageY;
                break;
        }

        if(imageWidth<25){imageWidth=25;}
        if(imageHeight<25){imageHeight=25;}

        // set the image right and bottom
        imageRight = imageX + imageWidth;
        imageBottom = imageY + imageHeight;

        // redraw the image with resizing anchors
        draw(imageOptions,crop,canvas, true, true);

    } else if (draggingImage) {

        imageClick = false;

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        imageX += dx;
        imageY += dy;
        imageRight += dx;
        imageBottom += dy;
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw the image with border
        draw(imageOptions,crop,canvas, true, true);

    }


}

//
// Download Image
//

function downloadImage (key, options){
    var fileName = key + '_' + options.width + 'x' + options.height + '.png';
    canvas.toBlob(function (blob) {
        saveAs(blob, fileName);
    });
}

//
// Draw Text
//

function drawText(imageOptions, ctx, canvas){
    var language = imageOptions.language
        , sonyAlignment = imageOptions.sonyAlignment
        , isSkin = imageOptions.isSkin
        , itemName = imageOptions.skinName
        , skinName = imageOptions.skinName.toUpperCase() + ' SKIN'
        , showLogo = imageOptions.showLogo
        , formLangEl = $('input#' + language).val()
        , textOffset = 160
        , textYPosition = canvas.height - canvasOffset - textOffset
        , textXPosition = canvasOffset - 10
        , formHeroEl = $('input#hero').val().toUpperCase()
        , formRuHeroEl = $('input#ruHero').val().toUpperCase()
        , formCustomEl = $('input#custom').val()
        , formColorEl = $('input#color').val();

    if(formLangEl !== undefined){
        formLangEl = formLangEl.toUpperCase();
    }

    if(sonyAlignment){
        textOffset = 60;
        var textWidth = ctx.measureText(formLangEl).width;
        textXPosition = canvas.width - textWidth / 2 + 35;
        textYPosition = canvas.height - 235;
        ctx.textAlign="right";
    }

    if(showLogo){
        drawLogo(imageOptions,ctx,canvas);
    }

    if(!isSkin){
        if(itemName !== "twitch" && itemName !== 'vkHeader'){
            ctx.fillStyle=formColorEl;
            ctx.font="94px contax_Bold";
            ctx.textBaseline = 'top';
            wrapText(ctx, formLangEl, textXPosition, textYPosition, 500, 80);
        } else if(itemName === "twitch"){
            var subYPosition = canvas.height - 50;
            textYPosition = canvas.height - 110;
            textXPosition = textXPosition - 15;
            var textHeading = "DEVELOPER STREAM";
            var devText = formHeroEl+ " LAUNCH STREAM";

            ctx.fillStyle=formColorEl;
            ctx.font="94px contax_Bold";

            ctx.fillText(textHeading, textXPosition, textYPosition);
            ctx.font="52px contax_Bold";
            ctx.fillStyle='#ffffff';

            ctx.fillText(devText, textXPosition, subYPosition);
        } else if(itemName === 'vkHeader'){
            ctx.fillStyle='#ffffff';
            ctx.font="94px contax_Bold";
            ctx.textBaseline = 'middle';
            ctx.textAlign = "center";
            textXPosition = canvas.width / 2;
            subYPosition = canvas.height - canvasOffset - textOffset;
            textYPosition = canvas.height - canvasOffset - textOffset + 50;
            var subheading = 'Новый герой';

            ctx.fillStyle='#ffffff';
            ctx.font="32px contax_Bold";

            ctx.fillText(subheading, textXPosition, subYPosition);
            ctx.font="60px contax_Bold";
            ctx.fillStyle='#ffffff';

            ctx.fillText(formRuHeroEl, textXPosition, textYPosition);
        }

    } else if(isSkin){
        textOffset = 50;
        ctx.fillStyle='#ffffff';
        ctx.font="58px contax_Bold";
        textYPosition = canvas.height - textOffset * 1.5;
        var skinYPosition = textYPosition + textOffset / 1.5;
        ctx.fillText(formHeroEl, textXPosition, textYPosition);
        ctx.font="20px contax_Bold";
        if(imageOptions.skinName === 'custom'){
            skinName = formCustomEl.toUpperCase() + ' SKIN';
        }
        ctx.fillText(skinName, textXPosition, skinYPosition);
    }
}

//
// Draw release note specific stuff
//

function drawReleaseNote(imageOptions,showRussianReleaseNote,ctx){
    var formHeroEl = $('input#hero').val().toUpperCase();
    var releaseNoteWidth = imageOptions.width;
    var releaseNoteHeight = imageOptions.height;

    if(showRussianReleaseNote){
        formHeroEl = $('input#ruHero').val().toUpperCase();
    }

    ctx.drawImage(releaseNotesImg, 0, 0, releaseNoteWidth, releaseNoteHeight);
    ctx.fillStyle='#000000';
    ctx.font="14px contax_Bold";
    ctx.fillText(formHeroEl, 15, 24);
}

//
// Draw various logos
//

function drawLogo(imageOptions,ctx,canvas){
    var sonyAlignment = imageOptions.sonyAlignment
        , isYoutube = imageOptions.isYoutube
        , showLogo = imageOptions.showLogo
        , isSkin = imageOptions.isSkin
        , skinName = imageOptions.skinName
        , iPlogo = logo
        , logoWidth = 370
        , logoHeight = 225
        , logoXPos = canvas.width - logoWidth - canvasOffset
        , logoYPos = canvas.height - logoWidth + canvasOffset;

    var invertEl = document.getElementById('invert').checked;
    if(invertEl){
        iPlogo = invertedLogo;
    }

    if(!isYoutube && showLogo && skinName !== 'twitch' || isSkin) {
        logoWidth = canvas.width / 5;
        logoHeight = canvas.width / 5 / 5;
        iPlogo = smallLogo;
        if(invertEl){
            iPlogo = invertedSmallLogo;
        }
        logoXPos = 20;
        logoYPos = canvas.height - logoHeight - canvasOffset;
        if(isSkin){
            logoWidth = canvas.width / 6;
            logoHeight = canvas.width / 6 / 5;
            logoXPos = canvas.width - logoWidth + logoWidth / 2 - logoWidth + 120;
            logoYPos = canvas.height - logoHeight - canvasOffset;
        }
    } else if(sonyAlignment){
        logoYPos = 40;
        logoXPos = canvas.width - logoWidth + logoWidth / 2 - canvasOffset * 2 + 20;
        logoWidth = 287;
        logoHeight = 175;
    }

    if(skinName === 'twitch'){
        iPlogo = logo;
        logoWidth = 406;
        logoHeight = 251;
        logoXPos = canvasOffset - 28;
        logoYPos = canvasOffset -  27;
    }

    ctx.drawImage(iPlogo, logoXPos, logoYPos, logoWidth, logoHeight);
}

//
// Draw play button
//

function drawPlayButton(imageOptions, ctx){
    var buttonWidth = 77
        , buttonHeight = 90;

    if(imageOptions.width > 800){
        buttonWidth = 154;
        buttonHeight = 180;
    }

    var buttonXPos = imageOptions.width  / 2 - buttonWidth / 2
        , buttonYPos = imageOptions.height  / 2 - buttonHeight / 2;

    ctx.drawImage(playButton, buttonXPos, buttonYPos, buttonWidth, buttonHeight);
}

//
// Draw gradient overlay
//

function drawGradient(imageOptions, ctx, canvas){
    var sonyAlignment = imageOptions.sonyAlignment;
    var gradient = epicGradient;
    if(sonyAlignment){
        gradient = sonyGradient;
    }
    ctx.drawImage(gradient, 0, 0, canvas.width, canvas.height);
}

//
// Helper function to enable wrapping text
//

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}
