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
				tl.to(counter, 0.8, {
					var: 9,
					onUpdate: function() {
						$(count).html(Math.ceil(counter.var));
					},
					onComplete: function() {

					},
					ease: Circ.easeOut
				}, '+=0.5');
			}
		});
	}

	let visibleElement = function(selector) {
		let box = selector.getBoundingClientRect(),
			w = window.innerHeight,
			top = w - box.top,
			bottom = w - box.bottom;

		if (top > 0) {
			return true;
		} else {
			return false;
		}
	}

	let getWorks = function() {
		let $grid = $('.grid');
			counter = 0;

		$.ajax({
			url: './json/works.json'
		}).done(function(data) {
			$(data.works).each(function(k, v) {
				let name = v.name,
					tags = v.tags,
					image = v.mainphoto,
					dataTag = v.data;
					workBlock = "<div class='grid-item grid-item--width" + counter + " grid-item--height" + counter +"' data-work=" + dataTag + "><div class='name'>" + name + "</div><div class='tags'>" + tags + "</div><div class='image'><img src='" + image + "' /></div></div>";

				$grid.append(workBlock);
				if (counter > 4) {
					counter = 0;
				}
				counter++;
			});
		}).then(function() {
			animateGrid();
		}).then(function() {
			workItem();
		});
	}

	let animateGrid = function() {
		let tl = new TimelineMax();
			works = document.getElementById('works')
			$items = $('.grid-item');

		window.addEventListener('scroll', function() {
			if (visibleElement(works) == true) {
				tl.staggerTo($items, 0.5, {opacity: 1}, '0.2');
			}
		});
	}

	let workItem = function() {
		let item = document.querySelectorAll('.grid-item');
		
		for (var i = item.length - 1; i >= 0; i--) {
			item[i].addEventListener('click', function() {
				let $data = $(this).attr('data-work');
				
				$.ajax({
					url: './json/works.json'
				}).done(function(data) {
					$(data.works).each(function(k, v) {
						if ($data == v.data) {
							
						} else {
							console.log('Error');
						}
					});
				});
			});
		}
	}

	let triggerLayout = function() {
		let $grid = $('.grid');

		$grid.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true
		});
		
	}
	
	return {
		init: function() {
			// Application functions go here
			heroHeight();
			showMenu();
			counterAnimation();
			getWorks();
		}
	}

})();

app.init();