'use strict';

let app = (function() {
	
	let heroHeight = function() {
		let $wh = window.innerHeight,
			$hero = $('#hero'),
			$container = $('.container');
			$content = $('#content');

		$hero.css({'height': $wh});
		$content.css({'margin-top': $wh});
	}

	let showMenu = function() {
		let line1 = document.querySelector('.line1'),
			line2 = document.querySelector('.line2'),
			line3 = document.querySelector('.line3'),
			menuIcon = document.querySelectorAll('.menu-icon'),
			nav = document.getElementById('nav'),
			clicked = false;

		for (var i = menuIcon.length - 1; i >= 0; i--) {
			menuIcon[i].addEventListener('click', function() {
				if (!clicked) {
					nav.className += " slideRight";
					clicked = true;
				} else {
					nav.className = " slideLeft"
					clicked = false;
				}
			});
		}
	}

	let counterAnimation = function() {
		let tl = new TimelineMax(),
			counter = { var: 0 },
			count = document.getElementById('count');
		
		window.addEventListener('scroll', function() {
			if (visibleElement(count) == true) {
				tl.to(counter, 1.5, {
					var: 8,
					onUpdate: function() {
						$(count).html(Math.ceil(counter.var));
					},
					onComplete: function() {

					},
					ease: Circ.easeOut
				}, '+=0.8');
			}
		});
	}

	let visibleElement = function(selector) {
		let box = selector.getBoundingClientRect(),
			w = window.innerHeight,
			top = w - box.top,
			bottom = w - box.bottom;

		if (top > 0 && bottom > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	return {
		init: function() {
			// Application functions go here
			heroHeight();
			showMenu();
			counterAnimation();
		}
	}

})();

app.init();