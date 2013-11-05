// Nikita Lebedev's blog, nazz.me/simple-jquery-popup
(function($) {
  $.fn.simplePopup = function(event) {

    var simplePopup = {

      settings: {
        hashtag: "#/",
        url: "popup",
        event: event || "click"
      },

      // Events
      initialize: function(self) {

        var popup = $(".js__popup");
        var body = $(".js__p_body");
        var close = $(".js__p_close");
        var routePopup = simplePopup.settings.hashtag + simplePopup.settings.url;

        var string = self[0].className;
        var name = string.replace("js__p_", "");

        // We redefine the variables if there is an additional popap
        if ( !(name === "start") ) {
          var new_url = "another_popup";

          name = name.replace("_start", "_popup");
          popup = $(".js__" + name);
          routePopup = simplePopup.settings.hashtag + new_url;
        };

        // Call when have event
        self.on(simplePopup.settings.event, function() {
          simplePopup.show(popup, body, routePopup);
          return false;
        });

        $(window).on("load", function() {
          simplePopup.hash(popup, body, routePopup);
        });

        // Close
        body.on("click", function() {
          simplePopup.hide(popup, body);
        });

        close.on("click", function() {
          simplePopup.hide(popup, body);
          return false;
        });

        // Closure of the button "Esc"
        $(window).keyup(function(e) {
          if (e.keyCode === 27) {
            simplePopup.hide(popup, body);
          }
        });

      },

      // Centering method
      centering: function(self) {
        var marginLeft = -self.width()/2;
        return self.css("margin-left", marginLeft);
      },

      // The overall function of the show
      show: function(popup, body, routePopup) {
        simplePopup.centering(popup);
        body.removeClass("js__fadeout");
        popup.removeClass("js__slide_top");
        location.hash = routePopup;
      },

      // The overall function of the hide
      hide: function(popup, body) {
        popup.addClass("js__slide_top");
        body.addClass("js__fadeout");
        location.hash = simplePopup.settings.hashtag;
      },

      // Watch hash in URL
      hash: function(popup, body, routePopup) {
        if (location.hash === routePopup) {
          simplePopup.show(popup, body, routePopup);
        }
      }

    };

    // In loop looking for what is called
    return this.each(function() {
      var self = $(this);
      simplePopup.initialize(self);
    });

  };
})(jQuery);

