const CACHE_VERSION = 1;

const CURRENT_CACHES = {
  cssCache: `css-cache-v${CACHE_VERSION}`,
  jsCache: `js-cache-v${CACHE_VERSION}`,
  jsonCache: `json-cache-v${CACHE_VERSION}`,
  imageCache: `image-cache-v${CACHE_VERSION}`,
};

workbox.core.clientsClaim();
workbox.core.skipWaiting();

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/app-shell'));

// CSS files strategy
workbox.routing.registerRoute(
  /.*\.css/,
  new workbox.strategies.CacheFirst({
    cacheName: CURRENT_CACHES.cssCache,
  })
);

workbox.routing.registerRoute(
  /(?:client|vendor).*\.js$/,
  new workbox.strategies.CacheFirst({
    cacheName: CURRENT_CACHES.jsCache,
  })
);

workbox.routing.registerRoute(
  /^(?!client|vendor).*\.js$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CURRENT_CACHES.jsCache,
  })
);

workbox.routing.registerRoute(
  /.*\.(?:json)/,
  new workbox.strategies.CacheFirst({
    cacheName: CURRENT_CACHES.jsonCache,
  })
);

workbox.routing.registerRoute(
  /.*\.(?:gif|jpg|jpeg|png|svg)/,
  new workbox.strategies.CacheFirst({
    cacheName: CURRENT_CACHES.imageCache,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 1000,
      }),
    ],
  })
);
