/**
 * pwa.js: install experience, service worker registration, update flow and offline state.
 * Registers the worker only on http(s). Nothing here runs when the site is opened as a plain file.
 */
(function () {
  "use strict";

  var metaBase = document.querySelector('meta[name="ba-base"]');
  var BASE = metaBase ? metaBase.getAttribute("content") : "/";
  var isHttp = location.protocol === "http:" || location.protocol === "https:";
  var ua = navigator.userAgent || "";
  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var DISMISS_KEY = "ba-install-dismissed";
  var VISITS_KEY = "ba-visits";
  var DISMISS_DAYS = 30;

  function toast() { return window.BA && window.BA.toast ? window.BA.toast.apply(null, arguments) : null; }
  function store(get, key, value) {
    try { return get ? window.localStorage.getItem(key) : window.localStorage.setItem(key, value); } catch (e) { return null; }
  }

  /* ---------- Offline indicator ---------- */
  var pill = null;
  function syncOnline() {
    if (!navigator.onLine && !pill) {
      pill = document.createElement("div");
      pill.className = "offline-pill";
      pill.setAttribute("role", "status");
      pill.textContent = "You are offline. Showing saved pages.";
      document.body.appendChild(pill);
    } else if (navigator.onLine && pill) {
      pill.remove();
      pill = null;
    }
  }
  window.addEventListener("online", function () { syncOnline(); toast("Back online."); });
  window.addEventListener("offline", syncOnline);
  syncOnline();

  /* ---------- Install experience ---------- */
  var deferred = null;
  var btn = document.getElementById("install-btn");
  var link = document.getElementById("install-link");
  var card = document.getElementById("install-card");
  var sheet = document.getElementById("ios-sheet");

  function dismissedRecently() {
    var t = parseInt(store(true, DISMISS_KEY) || "0", 10);
    return t && Date.now() - t < DISMISS_DAYS * 86400000;
  }
  function showEntryPoints() {
    if (btn) btn.classList.add("is-available");
    if (link) link.hidden = false;
  }
  function hideAll() {
    if (btn) btn.classList.remove("is-available");
    if (link) link.hidden = true;
    if (card) card.hidden = true;
  }
  function openIosGuide() {
    if (sheet && sheet.showModal) sheet.showModal();
  }
  function startInstall() {
    if (deferred) {
      var promptEvent = deferred;
      deferred = null;
      promptEvent.prompt();
      promptEvent.userChoice.then(function (choice) {
        if (choice && choice.outcome === "accepted") hideAll();
        else showEntryPoints();
      });
    } else if (isIOS) {
      openIosGuide();
    }
  }

  if (!standalone && isHttp) {
    if (isIOS) showEntryPoints();
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferred = e;
      showEntryPoints();
    });
    window.addEventListener("appinstalled", function () {
      deferred = null;
      hideAll();
      toast("Installed. Find Build Log on your home screen.");
    });
    [btn, link].forEach(function (el) { if (el) el.addEventListener("click", startInstall); });

    var visits = parseInt(store(true, VISITS_KEY) || "0", 10);
    try {
      if (!window.sessionStorage.getItem("ba-counted")) {
        visits += 1;
        store(false, VISITS_KEY, String(visits));
        window.sessionStorage.setItem("ba-counted", "1");
      }
    } catch (e) { /* storage blocked: treat as a first visit */ }

    // Offer the install card only after a real visit: 25 seconds in, or on a later visit.
    window.setTimeout(function () {
      if (!card || dismissedRecently() || (!deferred && !isIOS)) return;
      if (document.getElementById("menu") && document.getElementById("menu").classList.contains("is-open")) return;
      card.hidden = false;
    }, visits > 1 ? 6000 : 25000);

    var accept = document.getElementById("install-accept");
    var dismiss = document.getElementById("install-dismiss");
    if (accept) accept.addEventListener("click", function () { card.hidden = true; startInstall(); });
    if (dismiss) dismiss.addEventListener("click", function () { card.hidden = true; store(false, DISMISS_KEY, String(Date.now())); });
  }
  var iosClose = document.getElementById("ios-close");
  if (iosClose && sheet) {
    iosClose.addEventListener("click", function () { sheet.close(); });
    sheet.addEventListener("click", function (e) { if (e.target === sheet) sheet.close(); });
  }

  /* ---------- Service worker and safe update flow ---------- */
  if (!isHttp || !("serviceWorker" in navigator)) return;

  // A first visit has no controller, and the worker taking over that page is not an update:
  // nothing should reload. Every later takeover is a version the visitor accepted via "Refresh".
  var skipFirstTakeover = !navigator.serviceWorker.controller;
  var reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (skipFirstTakeover) { skipFirstTakeover = false; return; }
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  function offerUpdate(worker) {
    toast("A new version is ready.", "info", {
      sticky: true,
      action: { label: "Refresh", onClick: function () { worker.postMessage({ type: "SKIP_WAITING" }); } }
    });
  }

  window.addEventListener("load", function () {
    navigator.serviceWorker.register(BASE + "sw.js", { scope: BASE }).then(function (reg) {
      if (reg.waiting && navigator.serviceWorker.controller) offerUpdate(reg.waiting);
      reg.addEventListener("updatefound", function () {
        var incoming = reg.installing;
        if (!incoming) return;
        incoming.addEventListener("statechange", function () {
          if (incoming.state === "installed" && navigator.serviceWorker.controller) offerUpdate(incoming);
        });
      });
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") reg.update().catch(function () { /* offline */ });
      });
    }).catch(function () { /* the site works fine without a service worker */ });
  });
})();
