(function($) {
  $.fn.simplePopup = function(event) {
    var simplePopup = {
      settings: {
        url: "popup",
        event: event || "click"
      },

      initialize: function(link) {
        var popup = $(".js_popup");
        var body = $(".js_popup-body");
        var close = $(".js_popup__close");

        var cssClasses = link[0].className;

        link.addClass("js_popup-start_active");

        if (cssClasses.indexOf(" ") >= 0) {
          cssClasses = cssClasses.split(" ");

          for (key in cssClasses) {
            if (cssClasses[key].indexOf("js_popup-") === 0) {
              cssClasses = cssClasses[key]
            }
          };
        }

        var name = cssClasses.replace("js_popup-", "");

        // We redefine the variables if there is an additional popap
        if (name !== "start") {
          name = name.replace("-start", "-popup");
          popup = $(".js_" + name);
        };

        link.on(simplePopup.settings.event, function() {
          simplePopup.show(popup, body);
          return false;
        });

        body.on("click", function() {
          simplePopup.hide(popup, body);
        });

        close.on("click", function() {
          simplePopup.hide(popup, body);
          return false;
        });

        $(window).keyup(function(e) {
          if (e.keyCode === 27) {
            simplePopup.hide(popup, body);
          }
        });
      },


      centering: function(popup) {
        var marginLeft = -popup.width()/2;
        return popup.css("margin-left", marginLeft);
      },

      show: function(popup, body) {
        simplePopup.centering(popup);
        body.removeClass("js_popup-body__fadeout");
        popup.removeClass("js_popup__slide-top");
      },

      hide: function(popup, body) {
        popup.addClass("js_popup__slide-top");
        body.addClass("js_popup-body__fadeout");
        $(".js_popup-start_active").addClass("js_popup-start_active");
      }
    };


    return this.each(function() {
      var link = $(this);
      simplePopup.initialize(link);
    });
  };
})(jQuery);