var CACHE_ASSETS = 'my-assets-v1';
var	urlsToCache = ['/', '/index.html', '/public/js/app.min.js', '/public/css/app.min.css', '/public/images/_DSC8012.jpg', '/resume.pdf'];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_ASSETS)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
		);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
			// Cache hit - return response
			if (response) {
				return response;
			}
			var fetchRequest = event.request.clone();
			
			return fetch(fetchRequest).then(
				function(response) {
				// Check if we received a valid response
				if(!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				var responseToCache = response.clone();

				caches.open(CACHE_ASSETS)
				.then(function(cache) {
						cache.put(event.request, responseToCache);
					});

					return response;
				}
			);
		}
	));
});

self.addEventListener('activate', function(event) {
	var cacheWhitelist = ['my-assets-v1'];
	event.waitUntil(
		caches.keys().then(function(cacheName) {
			if (cacheWhitelist.indexOf(cacheName) === -1) {
				console.log('Cache updated');
				return caches.delete(cacheName);
			}
		})
	)
});