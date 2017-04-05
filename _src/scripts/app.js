'use strict';

var app = (function() {

	var selectedWorks = function() {
		var	siteUrl = 'http://alvin.dml.com/wp-json/wp/v2/posts';
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": siteUrl + "?per_page=6&categories=117",
			"method": "GET",
			"headers": {
				
			}
		}
		$.ajax(settings).done(function(data) {
			var work_posts = document.querySelector('.work-posts');
			for (var value of data) {
				var title = value.title.rendered,
					id = value.id,
					image = value.better_featured_image.source_url,
					work = "<div class='post'><a href='#" + title + "' class='data-post' data-post-id=" + id + "><h4 class='title'>" + title + "</h4><div class='overlay'></div><div class='featured-image'><img src=" + image +" /></div></a></div>";
				$(work_posts).append(work);
			}
		}).then(function() {
			workLinks();
		}).then(function() {
			animateGrid();
		});
	}

	var workLinks = function() {
		var workLink = document.querySelectorAll('a.data-post');
		for (var link of workLink) {
			link.addEventListener('click', function() {
				var id = this.getAttribute('data-post-id');
				openLightBox(id);
			});
		}
	}

	var openLightBox = function(id) {
		var	siteUrl = 'http://alvin.dml.com/wp-json/wp/v2/posts',
			lightbox = document.querySelector('.lightbox'),
			body = document.getElementsByTagName('body')[0];
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": siteUrl + "/" + id,
			"method": "GET",
			"headers": {
				
			}
		}
		$.ajax(settings).done(function(data) {
			console.log(data);
			var title = data.title.rendered;
			$('.lightbox h3.title').append(title);
		});
		lightbox.style.display = 'block';
		window.setTimeout(function() {
			addClass(lightbox, 'fadeIn');
		}, 300);
	}

	var closeLightbox = function() {
		var close = document.querySelector('.lightbox a.close'),
			lightbox = document.querySelector('.lightbox'),
			title = document.querySelector('.lightbox h3.title');

		close.addEventListener('click', function(e) {
			e.preventDefault();
					
			removeClass(lightbox, 'fadeIn');
			addClass(lightbox, 'fadeOut');
			window.setTimeout(function() {
				lightbox.style.display = 'none';
			}, 300);
			// Clear Content
			title.innerHTML = ' ';
		});
	}

	var getPostsFooter = function() {
		var	siteUrl = 'http://alvin.dml.com/wp-json/wp/v2/posts';
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": siteUrl + "?per_page=5&categories=118",
			"method": "GET",
			"headers": {
				
			}
		}
		$.ajax(settings).done(function(data) {
			var d = data;
			for (var value of data) {
				var title = value.title.rendered,
					id = value.id,
					post = "<div class='post'><h5 class='title'><a href='blog.html#" + id + "' class='data-post' data-post-id=" + id + ">" + title + "</a></h5></div>";
				$('#footer-post').append(post);
			}
		});
	}

	var heroHeight = function() {
		var $wh = window.innerHeight,
			$hero = $('#hero'),
			$container = $('.container');
			$content = $('#content');

		$hero.css({'height': $wh});
		$content.css({'margin-top': $wh});
	}

	var menuFadeIn = function() {
		var menu = document.querySelector('.wrapper header'),
			intro = document.querySelector('#intro');
		removeClass(intro, 'fadeIn');
		addClass(intro, 'fadeOut');
		removeClass(menu, 'fadeOut');
		addClass(menu, 'fadeIn');
	}

	var menuFadeOut = function() {
		var menu = document.querySelector('.wrapper header'),
			intro = document.querySelector('#intro');
		addClass(intro, 'fadeIn');
		removeClass(intro, 'fadeOut');
		addClass(menu, 'fadeOut');
		removeClass(menu, 'fadeIn');
	}

	var showMenu = function() {
		var line1 = document.querySelector('.line1'),
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
				$(nav).fadeIn().css({'display': 'flex'});
				for (var i = menuIconSpan.length - 1; i >= 0; i--) {
					menuIconSpan[i].style.background = 'white';
				}
				branding.style.color = 'white';
				clicked = true;
			} else {
				$(nav).fadeOut();
				for (var i = menuIconSpan.length - 1; i >= 0; i--) {
					menuIconSpan[i].style.background = 'black';
				}
				branding.style.color = 'black';
				clicked = false;
			}
		});
	}

	var counterAnimation = function() {
		var tl = new TimelineMax(),
			counter = { var: 0 },
			count = document.getElementById('count');
		
		window.addEventListener('scroll', function() {
			if (visibleElement(count) == true) {
				menuFadeIn();
				tl.to(counter, 0.8, {
					var: 9,
					onUpdate: function() {
						$(count).html(Math.ceil(counter.var));
					},
					onComplete: function() {

					},
					delay: 0.5,
					ease: Circ.easeOut
				}, '+=0.5');
			} else if (visibleElement(count) == false) {
				menuFadeOut();
			}
		});
	}

	var animateGrid = function() {
		var tl = new TimelineMax(),
			works = document.getElementById('works'),
			$items = $('.wrapper main #works .work-posts .post');

		window.addEventListener('scroll', function() {
			if (visibleElement(works) == true) {
				tl.staggerTo($items, 0.5, {opacity: 1, delay: 0.5}, '0.5');
			}
		});
	}

	var triggerLayout = function() {
		var $grid = $('.grid');

		$grid.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true
		});
		
	}

	// Helper Functions
	var addClass = function(selector, className) {
		selector.classList.add(className);
	}
	
	var removeClass = function(selector, className) {
		selector.classList.remove(className);
	}

	var visibleElement = function(selector) {
		var box = selector.getBoundingClientRect(),
			w = window.innerHeight,
			top = w - box.top,
			bottom = w - box.bottom;

		if (top > 200) {
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
			selectedWorks();
			getPostsFooter();
			closeLightbox();
		}
	}

})();

app.init();