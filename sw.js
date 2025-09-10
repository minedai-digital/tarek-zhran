// Service Worker for Tarek Zhran Portfolio - Enhanced Performance Version

const CACHE_NAME = 'tarek-zhran-portfolio-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/translations.js',
  '/manifest.json',
  '/assets/favicon.ico',
  '/assets/apple-touch-icon.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline with network-first strategy for HTML
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Network-first strategy for HTML documents
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the response for future offline use
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // Serve from cache if network fails
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for other assets
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  const title = 'Tarek Zhran Portfolio';
  const options = {
    body: event.data.text(),
    icon: '/assets/favicon.ico',
    badge: '/assets/favicon.ico'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});