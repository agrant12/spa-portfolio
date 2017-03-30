'use strict';

var app = (function() {

	var getPosts = function(number, category) {
		if (number === undefined) {
			number = 10;
		}
		var posts = [],
			siteUrl = 'http://alvin.dml.com/wp-json/wp/v2/posts/';
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": siteUrl + "?per_page=" + number + '&category=' + category,
			"method": "GET",
			"headers": {
				
			}
		}
		$.ajax(settings).done(function(data) {
			var d = data;
			console.log(data);
			return data;
			/*for (var value of data) {
				var title = value.title.rendered;
				posts.push("<div class='post'><h3 class='title'>" + title + "</h3></div>");
			}*/
		});
	}

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
			var d = data;
			for (var value of data) {
				var title = value.title.rendered,
					id = value.id,
					image = value.better_featured_image.source_url,
					work = "<div class='post'><a href='work.html#" + id + "' class='data-post' data-post-id=" + id + "><h4 class='title'>" + title + "</h4><div class='overlay'></div><div class='featured-image'><img src=" + image +" /></div></a></div>";
				$('.work-posts').append(work);
			}
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

	var displayPost = function() {
		var hash = window.location.hash;

		if (hash) {
			id = hash.replace('#','');
			var	siteUrl = 'http://alvin.dml.com/wp-json/wp/v2/posts';
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": siteUrl + "/" + id,
				"method": "GET",
				"headers": {
					
				}
			}
			$.ajax(settings).done(function(data) {
				var title = data.title.rendered,
					image = data.better_featured_image.source_url,
					content = data.content.rendered;
				$('h1.title').append(title);
				$('#featured-image').append('<img src="' + image + '" />');
				$('div.content').append(content);
			});
		}
	}

	var heroHeight = function() {
		var $wh = window.innerHeight,
			$hero = $('#hero'),
			$container = $('.container');
			$content = $('#content');

		$hero.css({'height': $wh});
		$content.css({'margin-top': $wh});
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
				tl.to(counter, 0.8, {
					var: 9,
					onUpdate: function() {
						$(count).html(Math.ceil(counter.var));
					},
					onComplete: function() {

					},
					delay: 1,
					ease: Circ.easeOut
				}, '+=0.5');
			}
		});
	}

	var skillsBar = function() {
		var skills = document.querySelector('.skills-bar');
		window.addEventListener('scroll', function() {
			if (visibleElement(skills) == true) {
				TweenLite.to('.html', 0.5, {attr:{x2:200}, delay: 0.5, ease:Linear.easeNone});
				TweenLite.to('.css', 0.5, {attr:{x2:200}, delay: 1.0, ease:Linear.easeNone});
				TweenLite.to('.js', 0.5, {attr:{x2:185}, delay: 0.9, ease:Linear.easeNone});
				TweenLite.to('.python', 0.5, {attr:{x2:160}, delay: 1.1, ease:Linear.easeNone});
				TweenLite.to('.php', 0.5, {attr:{x2:193}, delay: 1.0, ease:Linear.easeNone});
				TweenLite.to('.mysql', 0.5, {attr:{x2:170}, delay: 1.3, ease:Linear.easeNone});
			}
		});
	}

	var animateGrid = function() {
		var tl = new TimelineMax();
			works = document.getElementById('works')
			$items = $('.grid-item');

		window.addEventListener('scroll', function() {
			if (visibleElement(works) == true) {
				tl.staggerTo($items, 0.5, {opacity: 1}, '0.2');
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

		if (top > 0) {
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
			displayPost();
		}
	}

})();

app.init();