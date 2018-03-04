// Google maps setup

var map;
google.maps.event.addDomListener(window, 'load', googleMapsInit);


function googleMapsInit() {
    var myLatlng = new google.maps.LatLng(51.372027, 6.160478);
    var mapOptions = {
        zoom: 15,
        center: myLatlng,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        disableDefaultUI: true,
        styles: [{"featureType":"landscape","stylers":[{"visibility":"simplified"},{"color":"#2b3f57"},{"weight":0.1}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"weight":0.4},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"weight":1.3},{"color":"#FFFFFF"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":3}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":1.1}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":0.4}]},{},{"featureType":"road.highway","elementType":"labels","stylers":[{"weight":0.8},{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.7}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"color":"#6c5b7b"}]},{"featureType":"water","stylers":[{"color":"#f3b191"}]},{"featureType":"transit.line","stylers":[{"visibility":"on"}]}]
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: 'http://jansmolders.nl/expo-mate/assets/images/marker.png',
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content: $('.contact-details-map').html()
    });


    if($(window).width() > 450){
        map.panBy(200, -150);
    }

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}


$(function(){
    if ($("#google-reviews").length == 0) {
        return
    }
    $("#google-reviews").googlePlaces({
        placeId: 'ChIJt6JxUkxFx0cRWTzXobLcYGw',
        header: "<h3>"+$('.testimonial-caption').html()+"</h3>", // html/text over Reviews
        footer: '', // html/text under Reviews block
        max_rows: 2, // max rows of reviews to be displayed
        min_rating: 4, // minimum rating of reviews to be displayed
        months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        text_break_length: "90", // length before a review box is set to max width
        shorten_names: true, // example: "Max Mustermann" -> "Max M.""
    });
});
