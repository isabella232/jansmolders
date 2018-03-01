/* README
Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/

Stevens code was based on peledies jquery plugin on github:
https://github.com/peledies/google-places

made me think and remix their work into the following lines.

Thank you guys!
*/

(function($) {

  $.fn.googlePlaces = function(options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      // These are the defaults.
      header: "<h3>Google Reviews</h3>",
      footer: '',
      max_rows: 6,
      min_rating: 4,
      months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      text_break_length: "90",
      shorten_names: true,
      placeId: ""
    }, options);

    var target_div = this[0];
    var target_div_jquery = this;

    var renderHeader = function(header) {
      var html = "";
      html += header + "<br>";
      target_div_jquery.append(html);
    };

    var renderFooter = function(footer) {
      var html = "";
      html += "<br>" + footer + "<br>";
      target_div_jquery.after(html);
    };

    var shorten_name = function(name) {
      if (name.split(" ").length > 1) {
        var xname = "";
        xname = name.split(" ");
        return xname[0] + " " + xname[1][0] + ".";
      }
    };

    var renderStars = function(rating) {
      var stars = '<div class="review-stars"><ul>';
      // fill in gold stars
      for (var i = 0; i < rating; i++) {
        stars += '<li><i class="star"></i></li>';
      }
      // fill in empty stars
      if (rating < 5) {
        for (var i = 0; i < (5 - rating); i++) {
          stars += '<li><i class="star inactive"></i></li>';
        }
      }
      stars += "</ul></div>";
      return stars;
    };

    var convertTime = function(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = settings.months;
      var time = a.getDate() + ". " + months[a.getMonth()] + " " + a.getFullYear();
      return time;
    };

    var filterReviewsByMinRating = function(reviews) {
      for (var i = reviews.length - 1; i >= 0; i--) {
        if (reviews[i].rating < settings.min_rating) {
          reviews.splice(i, 1);
        }
      }
      return reviews;
    };

    var renderReviews = function(reviews) {
      reviews.reverse();
      var html = "";
      var row_count = (settings.max_rows > 0) ? settings.max_rows - 1 : reviews.length - 1;
      // make sure the row_count is not greater than available records
      row_count = (row_count > reviews.length - 1) ? reviews.length - 1 : row_count;
      for (var i = row_count; i >= 0; i--) {
        var stars = renderStars(reviews[i].rating);
        var date = convertTime(reviews[i].time);
        var name = settings.shorten_names ? shorten_name(reviews[i].author_name) : reviews[i].author_name;
        var style = (reviews[i].text.length > parseInt(settings.text_break_length)) ? "review-item-long" : "review-item";
        html = html + "<div class="+ style +"><div class='review-meta'><span class='review-author'>" + name + "</span><span class='review-sep'></span>" + "</div>" + stars + "<p class='review-text'>" + reviews[i].text + "</p></div>";
        // I do not need to display the date... but if you do:
        // +"<br><span class='review-date'>"+date+"</span>"+
      }
      target_div_jquery.append(html);
    };

    // GOOGLE PLACES API CALL STARTS HERE
    // initiate a Google Places Object
    var service = new google.maps.places.PlacesService(target_div);
    // set.getDetails takes 2 arguments: request, callback
    // see documentation here:  https://developers.google.com/maps/documentation/javascript/3.exp/reference#PlacesService
    const request = {
      placeId: settings.placeId
    };
    // the callback is what initiates the rendering if Status returns OK
    var callback = function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var filtered_reviews = filterReviewsByMinRating(place.reviews);
        renderHeader(settings.header);
        renderReviews(filtered_reviews);
        renderFooter(settings.footer);
      }
    }

    return this.each(function() {
      // Runs the Plugin
      if (settings.placeId === undefined || settings.placeId === "") {
        console.error("NO PLACE ID DEFINED");
        return
      }
      service.getDetails(request, callback);
    });

  };

}(jQuery));
