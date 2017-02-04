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
			menuIcon = document.querySelector('.menu-icon'),
			menuIconSpan = document.querySelectorAll('.menu-icon span'),
			branding = document.querySelector('.branding a h1'),
			nav = document.getElementById('nav'),
			clicked = false;

		menuIcon.addEventListener('mouseover', function() {
			addClass(line1, 'move-left');
			addClass(line2, 'move-right');
			addClass(line3, 'move-left');
		});

		menuIcon.addEventListener('mouseout', function() {
			removeClass(line1, 'move-left');
			removeClass(line2, 'move-right');
			removeClass(line3, 'move-left');
		});

		menuIcon.addEventListener('click', function() {
			if (!clicked) {
				$(nav).slideDown().css({'display': 'flex'});
				for (var i = menuIconSpan.length - 1; i >= 0; i--) {
					menuIconSpan[i].style.background = 'white';
				}
				branding.style.color = 'white';
				clicked = true;
			} else {
				$(nav).slideUp();
				for (var i = menuIconSpan.length - 1; i >= 0; i--) {
					menuIconSpan[i].style.background = 'black';
				}
				branding.style.color = 'black';
				clicked = false;
			}
		});
	}

	let socialIcons = function() {
		let socialIcon = querySelectorAll('.social a');
		for (var i = socialIcon.length - 1; i >= 0; i--) {

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

		$.ajax({
			url: './json/works.json'
		}).done(function(data) {
			$(data.works).each(function(k, v) {
				let name = v.name,
					tags = v.tags,
					image = v.mainphoto,
					dataTag = v.data;
					workBlock = "<div class='grid-item' data-work=" + dataTag + "><div class='name'>" + name + "</div><div class='tags'>" + tags + "</div><div class='image'><img src='" + image + "' /></div></div>";

				$grid.append(workBlock);
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
				let $dataTag = $(this).attr('data-work');
				
				$.ajax({
					url: './json/works.json'
				}).done(function(data) {
					$(data.works).each(function(k, v) {
						if ($dataTag == v.data) {
							
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

	// Helper Functions
	let addClass = function(selector, className) {
		selector.classList.add(className);
	}
	
	let removeClass = function(selector, className) {
		selector.classList.remove(className);
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