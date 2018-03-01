var inkbox = document.getElementById("comparison");
var colorbox = document.getElementById("after");
var fillerImage = document.getElementById("before");

inkbox.addEventListener("mousemove",trackLocation,false);
inkbox.addEventListener("touchstart",trackLocation,false);
inkbox.addEventListener("touchmove",trackLocation,false);

function trackLocation(e){
    var rect = fillerImage.getBoundingClientRect();
    var position = ((e.pageX - rect.left) / fillerImage.offsetWidth)*100;
    if(position <= 100){
        colorbox.style.width = position+"%";
    }
}