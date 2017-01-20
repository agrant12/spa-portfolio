'use strict';

let app = (function() {
	
	let heroHeight = function() {
		let $wh = window.innerHeight,
			$hero = $('#hero');

		$hero.css({'height': $wh});
	}

	let menuIcon = function() {
		let line1 = document.querySelector('.line1'),
			line2 = document.querySelector('.line2'),
			line3 = document.querySelector('.line3'),
			menuIcon = document.querySelectorAll('.menu-icon'),
			nav = document.getElementById('nav'),
			clicked = false;

			for (var i = menuIcon.length - 1; i >= 0; i--) {
				menuIcon[i].addEventListener('click', function() {
					if (!clicked) {
						/*line1.className = "rotate1";
						line2.className = "rotate2";
						line3.className = "rotate3";*/
						nav.className += " slideRight";
						clicked = true;
					} else {
						/*line1.className = "";
						line2.className = "";
						line3.className = "";
						nav.className = "";*/
						nav.className = " slideLeft"
						clicked = false;
					}
				});
			}
		/*$menuIcon.on('click', function() {
			if (!$clicked) {
				$line1.addClass('rotate1');
				$line2.addClass('rotate2');
				$line3.addClass('rotate3');
				nav.style.display = 'flex';
				$clicked = true;
			} else {
				$line1.removeClass('rotate1');
				$line2.removeClass('rotate2');
				$line3.removeClass('rotate3');
				nav.style.display = 'none';
				$clicked = false;
			}
		});*/
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