// Service Worker for Tarek Zhran Portfolio
const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/translations.js',
  '/assets/favicon.ico',
  '/assets/apple-touch-icon.png',
  '/images/profile.jpg',
  '/images/hero.jpg',
  '/assets/linkedin.svg',
  '/assets/github.svg',
  '/assets/twitter.svg',
  '/assets/cv.pdf'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Handle Fetch Events
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version if available
      if (response) {
        return response;
      }

      // Clone the request as it can only be used once
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
        // Check for valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response as it can only be used once
        const responseToCache = response.clone();

        // Cache new resources
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      });
    })
  );
});

// Handle Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/assets/apple-touch-icon.png',
    badge: '/assets/favicon.ico'
  };

  event.waitUntil(
    self.registration.showNotification('Tarek Zhran Portfolio', options)
  );
});
