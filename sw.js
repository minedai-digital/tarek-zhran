// Service Worker for Tarek Zhran Portfolio

const CACHE_NAME = 'tarek-zhran-portfolio-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/animations.css',
  '/css/responsive.css',
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

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
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