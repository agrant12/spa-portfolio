'use strict';

let app = (function() {
	
	let heroHeight = function() {
		let $wh = window.innerHeight,
			$hero = $('#hero');

		$hero.css({'height': $wh});
	}

	let menuIcon = function() {
		let $line1 = $('.line1'),
			$line2 = $('.line2'),
			$line3 = $('.line3'),
			$menuIcon = $('#menu-icon'),
			$clicked = false;

		$menuIcon.on('click', function() {
			if (!$clicked) {
				$line1.addClass('rotate1');
				$line2.addClass('rotate2');
				$line3.addClass('rotate3');
				$clicked = true;
			} else {
				$line1.removeClass('rotate1');
				$line2.removeClass('rotate2');
				$line3.removeClass('rotate3');
				$clicked = false;
			}
		});
	}

	return {
		init: function() {
			// Application functions go here
			heroHeight();
			menuIcon();
		}
	}

})();

app.init();