'use strict';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('./sw.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

var app = (function() {

	var selectedWorks = function() {
		var	siteUrl = 'http://alvingrant.com/api/wp-json/wp/v2/posts';
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": siteUrl + "?per_page=6&categories=2",
			"method": "GET"
		}
		$.ajax(settings).done(function(data) {
			var work_posts = document.querySelector('.work-posts');

			// Save post data to local storage
			savePostData(data);
			
			for (var value of data) {
				var title = value.title.rendered,
				id = value.id,
				image = value.better_featured_image.source_url,
				tags = value.acf.project_type;

				var	work = "<div class='post'><div class='data-post' data-post-id=" + id + "><h4 class='title'>" + title + "</h4><p class='tags'>" + tags + "</p><div class='overlay'></div><div class='featured-image'><img src=" + image +" /></div></div></div>";
				$(work_posts).append(work);
			}
		}).then(function() {
			workLinks();
		}).then(function() {
			animateGrid();
		});
	}

	var workLinks = function() {
		var workLink = document.querySelectorAll('div.data-post');
		for (var link of workLink) {
			link.addEventListener('click', function() {
				var id = this.getAttribute('data-post-id');
				openLightBox(id);
			});
		}
	}

	// Save data to local storage
	var savePostData = function(data) {
		if (window.localStorage) {
			for (var post of data) {
				localStorage.setItem(post.id, JSON.stringify(post));
			}
		} else {
			return false;
		}
	}

	var openLightBox = function(id) {

		var post = JSON.parse(localStorage.getItem(id)),
			lightbox = document.querySelector('.lightbox'),
			body = document.getElementsByTagName('body')[0],
			overlay = document.querySelector('.body-overlay');

		if (post !== null) {
			var title = post.title.rendered,
				img = post.better_featured_image.source_url,
				content = post.content.rendered,
				gallery = post.acf.gallery,
				tags = post.acf.project_type;

			$('.lightbox #preloader_overlay').fadeOut(600);
			$('.lightbox h3.title').append(title);
			$('.lightbox .content').append(content);
			$('.lightbox .tags').append(tags);

			for (image of gallery) {
				var img = '<img src="' + image.sizes.medium_large + '" />';
				$('.lightbox .gallery').append(img);
			}
		} else {
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "http://alvingrant.com/api/wp-json/wp/v2/posts/" + id,
				"method": "GET",
				complete: function() {
					$('.lightbox #preloader_overlay').fadeOut(600);
				}
			};
			$.ajax(settings).done(function(data) {
				var title = data.title.rendered,
					img = data.better_featured_image.source_url,
					content = data.content.rendered,
					gallery = data.acf.gallery,
					tags = data.acf.project_type;

				$('.lightbox #preloader_overlay').fadeOut(600);
				$('.lightbox h3.title').append(title);
				$('.lightbox .content').append(content);
				$('.lightbox .tags').append(tags);

				for (image of gallery) {
					var img = '<img src="' + image.sizes.medium_large + '" />';
					$('.lightbox .gallery').append(img);
				}
			});
		}	

		body.style.overflow = 'hidden';
		lightbox.style.display = 'block';
		overlay.style.display = 'block';

		window.setTimeout(function() {
			addClass(lightbox, 'fadeIn');
			addClass(overlay, 'fadeIn');
		}, 300);
	}

	var closeLightbox = function() {
		var close = document.querySelector('.lightbox div.close'),
		lightbox = document.querySelector('.lightbox'),
		title = document.querySelector('.lightbox h3.title'),
		content = document.querySelector('.lightbox .content'),
		gallery = document.querySelector('.lightbox .gallery'),
		tags = document.querySelector('.lightbox .tags'),
		overlay = document.querySelector('.body-overlay'),
		body = document.getElementsByTagName('body')[0];

		close.addEventListener('click', function(e) {
			e.preventDefault();

			body.style.overflow = 'auto';
			removeClass(lightbox, 'fadeIn');
			addClass(lightbox, 'fadeOut');

			removeClass(overlay, 'fadeIn');
			addClass(overlay, 'fadeOut');
			
			window.setTimeout(function() {
				overlay.style.display = 'none';
				lightbox.style.display = 'none';
			}, 300);

			// Clear Content
			title.innerHTML = ' ';
			content.innerHTML = ' ';
			gallery.innerHTML = ' ';
			tags.innerHTML = ' ';
		});
	}

	var getPostsFooter = function() {
		var	siteUrl = 'http://alvin.dml.com/wp-json/wp/v2/posts';
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": siteUrl + "?per_page=5&categories=118",
			"method": "GET",
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
			if (visibleElement(count, 200) == true) {
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
			} else if (visibleElement(count, 200) == false) {
				menuFadeOut();
			}
		});
	}

	var animateGrid = function() {
		var tl = new TimelineMax(),
		works = document.getElementById('works'),
		items = document.querySelectorAll('.work-posts .post');

		window.addEventListener('scroll', function() {
			if (visibleElement(works, 150) == true) {
				tl.staggerTo(items, 0.3, {opacity: 1, delay: 0.5}, '0.3');
			}
		});
	}

	var submitForm = function() {
		var form = document.getElementById('contact-form'),
		messages = document.getElementById('messages');

		form.addEventListener('submit', function(e) {
			e.preventDefault();

			var formData = $(form).serialize();

			$.ajax({
				type: 'POST',
				url: 'process.php',
				data: formData
			}).done(function(response) {
				// Make sure that the formMessages div has the 'success' class.
				$(messages).removeClass('error');
				$(messages).addClass('success');

				// Set the message text.
				$(messages).text(response);

				// Clear the form.
				$('#name').val('');
				$('#email').val('');
				$('#subject').val('');
				$('#message').val('');
			});
		});

	}

	var preload = function() {
		var loader = document.getElementById('preloader_overlay'),
		tl = new TimelineMax(),
		name = document.querySelector('.name'),
		occupation = document.querySelector('.occupation'),
		heroElements = document.querySelectorAll('.hero-element');

		addClass(loader, 'fadeOut');
		window.setTimeout(function() {
			loader.style.display = 'none';
		}, 900);

		tl.to(name, 0.3, {scale: 1.1, opacity: 1, delay: 2.2, ease: Bounce.easeOut });
		tl.to(name, 0.2, {scale: 1, delay: 0.2});
		tl.to(occupation, 0.5, {opacity: 1, delay: 3}, '0.3');
	}

	var instagram = function() {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.instagram.com/v1/users/self/media/recent/?access_token=217437600.65d63d0.6315713098514ed393b5373fca0f5393",
			"method": "GET",
			"contentType": "jsonp",
			"headers": {

			}
		}

		$.ajax(settings).done(function (response) {
			console.log(response);
		});
	}

	var aboutScroll = function() {
		var tl = new TimelineMax(),
		scroll_btn = document.getElementById('link-down'),
		about = document.getElementById('about').getBoundingClientRect(),
		header = document.getElementsByTagName('header')[0].clientHeight,
		pos = about.top - header;

		scroll_btn.addEventListener('click', function() {
			tl.to(window, 0.5, {scrollTo: { y: pos }});
		});
	}

	var animateTitle = function() {
		var titles = document.querySelectorAll('.wrapper main section h3.title');
		for (var title of titles) {
			console.log(title);
			window.addEventListener('scroll', function() {
				if (visibleElement(title, 200) == true) {
					addClass(title, 'fadeIn');
				}
			});
		}
	}

	/* 
	 *	Helper Functions
	 */
	 
	// Add class to DOM element
	var addClass = function(selector, className) {
		selector.classList.add(className);
	}
	
	// Remove class from DOM element
	var removeClass = function(selector, className) {
		selector.classList.remove(className);
	}

	// Check if DOM element is visible within Window object after set threshold
	var visibleElement = function(selector, threshold) {
		var box = selector.getBoundingClientRect(),
		w = window.innerHeight,
		top = w - box.top,
		bottom = w - box.bottom;

		if (top > threshold) {
			return true;
		} else {
			return false;
		}
	}

	return {
		init: function() {
			// Application functions go here
			heroHeight();
			counterAnimation();
			selectedWorks();
			closeLightbox();
			aboutScroll();
			submitForm();
			preload();
		}
	}

})();

$(document).ready(function() {
	app.init();
});