/* Build Log service worker.
 * - The app shell is precached on install, so the site opens offline.
 * - Pages: network first (never stale when online), then saved copy, then the offline page.
 * - Precached assets: served from the saved shell. Everything else: stale while revalidate.
 * - A new version waits until the visitor taps "Refresh", so nobody is switched mid-visit.
 * The placeholders below are filled in by scripts/build.mjs on every deployment. */
"use strict";

var VERSION = "{{VERSION}}";
var BASE = "{{BASE}}";
var SHELL = "ba-shell-" + VERSION;
var RUNTIME = "ba-runtime-v1";
var PRECACHE = {{PRECACHE}};
var RUNTIME_LIMIT = 80;
var NETWORK_TIMEOUT = 4000;

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(SHELL).then(function (cache) {
      return Promise.all(PRECACHE.map(function (path) {
        return cache.add(new Request(BASE + path, { cache: "reload" }));
      }));
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.indexOf("ba-") === 0 && key !== SHELL && key !== RUNTIME;
      }).map(function (key) { return caches.delete(key); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.indexOf(BASE) !== 0) return;
  if (url.pathname === BASE + "sw.js") return;

  if (req.mode === "navigate") event.respondWith(pageStrategy(req));
  else event.respondWith(assetStrategy(req));
});

function withTimeout(promise, ms) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () { reject(new Error("timeout")); }, ms);
    promise.then(function (value) { clearTimeout(timer); resolve(value); }, function (err) { clearTimeout(timer); reject(err); });
  });
}

function remember(request, response) {
  if (!response || response.status !== 200 || response.type === "opaque") return Promise.resolve();
  var copy = response.clone();
  return caches.open(RUNTIME).then(function (cache) {
    return cache.put(request, copy).then(function () { return cache.keys(); }).then(function (keys) {
      if (keys.length > RUNTIME_LIMIT) return cache.delete(keys[0]);
    });
  });
}

function pageStrategy(req) {
  return withTimeout(fetch(req), NETWORK_TIMEOUT).then(function (response) {
    remember(req, response);
    return response;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || caches.match(BASE + "offline.html");
    });
  });
}

function assetStrategy(req) {
  return caches.open(SHELL).then(function (shell) {
    return shell.match(req).then(function (hit) {
      if (hit) return hit;
      return caches.open(RUNTIME).then(function (runtime) {
        return runtime.match(req).then(function (cached) {
          var refresh = fetch(req).then(function (response) {
            remember(req, response);
            return response;
          });
          if (cached) { refresh.catch(function () {}); return cached; }
          return refresh;
        });
      });
    });
  });
}
