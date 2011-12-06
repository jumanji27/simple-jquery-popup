/* Блог Никиты Лебедева, http://lebedev-design.ru/ — http://blog.lebedev-design.ru/example/jquery-simple-popup/ */
(function($) {
	$.fn.simplePopup = function() {
		return this.each(function() {
		
			$(this).click(function() {
				$(".popup-body").fadeTo(300, 0.7); 
				$(".popup").center().fadeTo(300, 1);
				return false;		
			});
			$(".popup-body").click(function() { 
				$(this).fadeOut(300, 0);
				$(".popup").fadeOut(300, 0);
			}); // ссылки для вызова
			
			$(".popup-close").click(function() {
				$(this).parent().fadeOut(300, 0);
				$(".popup-body").fadeOut(300, 0);
				return false;		
			}); // кнопка закрыть у popup

			$.fn.center = function() {
				var marginTop = Math.max((document.documentElement.scrollTop + 30), (document.body.scrollTop + 30));
				var marginLeft = - this.width()/2;
				return this.css({
					"top": marginTop,
					"margin-left": marginLeft
				});
			} // центрирование popup
				
			$(document).keyup(function(event) {
				if (event.keyCode == 27) {
					$(".popup").fadeOut(300, 0);
					$(".popup-body").fadeOut(300, 0);
				}
			}); // закрытие по кнопке esc		
			
		});
	}
})(jQuery);