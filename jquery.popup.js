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

        var popup = $(".js__popup"),
            body = $(".js__p_body"),
            close = $(".js__p_close"),
            routePopup = simplePopup.settings.hashtag + simplePopup.settings.url,
            classes = self[0].className.split(' '),
            popupName = "popup";

        for (var i in classes) {
            if (classes[i].indexOf('js__p_') !== -1) {
                name = classes[i].replace("js__p_", "");
                if ( !(name === "start") ) {
                    popupName = name.replace("_start", "_popup");
                }
                break;
            }
        }
        popup = $(".js__" + popupName);
        routePopup = simplePopup.settings.hashtag + popupName;

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
