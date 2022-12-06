const CACHE_NAME = `mix-helper-kaga`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/css/index.css',
      '/js/index.js',
      '/js/petite-vue.iife.min.js',
      '/sw.js',
      '/index.html'
    ]);


  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const fetchResponse = await fetch(event.request);
      cache.put(event.request, fetchResponse.clone());
      return fetchResponse;
    } catch (e) {
      const cachedResponse = await cache.match(event.request);
      return cachedResponse;
    }
  })());
});