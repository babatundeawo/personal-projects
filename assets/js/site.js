/**
 * site.js: behaviour shared by every page.
 * Theme toggle, adaptive header, mobile menu (focus managed), scroll progress,
 * reveals, back-to-top, share button and the toast helper (window.BA.toast).
 * The first theme paint happens in the inline theme-init script, so there is no flash.
 * Every block is guarded, so the file is safe on any page.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var STORAGE_KEY = "ba-portfolio-theme"; // shared with the older project pages
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Toasts ---------- */
  var toastHost = document.getElementById("toasts");
  function toast(message, kind, options) {
    if (!toastHost) return null;
    options = options || {};
    var el = document.createElement("div");
    el.className = "toast" + (kind === "error" ? " toast--error" : "");
    el.setAttribute("role", kind === "error" ? "alert" : "status");
    var text = document.createElement("span");
    text.textContent = message;
    el.appendChild(text);
    function close() {
      if (!el.parentNode) return;
      el.classList.add("is-leaving");
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, reduceMotion ? 0 : 260);
    }
    if (options.action) {
      var act = document.createElement("button");
      act.type = "button";
      act.textContent = options.action.label;
      act.addEventListener("click", function () { options.action.onClick(); close(); });
      el.appendChild(act);
      var later = document.createElement("button");
      later.type = "button";
      later.textContent = "Later";
      later.addEventListener("click", close);
      el.appendChild(later);
    }
    toastHost.appendChild(el);
    if (!options.sticky) window.setTimeout(close, options.duration || 4500);
    return { close: close, el: el };
  }
  window.BA = { toast: toast };

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  function currentTheme() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function syncThemeUi() {
    var light = currentTheme() === "light";
    if (themeBtn) themeBtn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    var c = light ? "#faf9f7" : "#0c0b0a";
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", c);
  }
  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (err) { /* private mode: choice just won't persist */ }
    syncThemeUi();
  }
  syncThemeUi();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      if (document.startViewTransition && !reduceMotion) document.startViewTransition(function () { setTheme(next); });
      else setTheme(next);
    });
  }

  /* ---------- Adaptive header ---------- */
  var header = document.getElementById("site-header");
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
      var menuOpen = body.classList.contains("menu-open");
      var focusInside = header.contains(document.activeElement);
      var away = false;
      if (!menuOpen && !focusInside) {
        if (y > lastY + 6 && y > 240) away = true;
        else if (y < lastY - 6 || y <= 240) away = false;
        else away = header.classList.contains("is-hidden");
      }
      header.classList.toggle("is-hidden", away);
      body.classList.toggle("header-away", away);
    }
    var top = document.getElementById("to-top");
    if (top) top.classList.toggle("is-visible", y > 700);
    if (!hasScrollTimeline) {
      var max = root.scrollHeight - window.innerHeight;
      var bar = document.querySelector(".progress");
      if (bar) bar.style.setProperty("--p", max > 0 ? String(Math.min(1, y / max)) : "0");
    }
    lastY = y;
    ticking = false;
  }
  var hasScrollTimeline = window.CSS && CSS.supports && CSS.supports("animation-timeline", "scroll()");
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (header) header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); body.classList.remove("header-away"); });

  var toTop = document.getElementById("to-top");
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    var target = document.getElementById("main");
    if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var inertTargets = [document.getElementById("main"), document.querySelector(".site-footer")];
  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    inertTargets.forEach(function (el) { if (el) el.inert = open; });
    if (open) {
      header.classList.remove("is-hidden");
      var first = menu.querySelector("a");
      if (first) window.setTimeout(function () { first.focus(); }, 30);
    }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (e.key === "Escape") { setMenu(false); burger.focus(); return; }
      if (e.key === "Tab") {
        var nodes = Array.prototype.slice.call(header.querySelectorAll("a[href], button:not([hidden])")).concat(Array.prototype.slice.call(menu.querySelectorAll("a[href]")));
        nodes = nodes.filter(function (n) { return n.offsetParent !== null || n === burger; });
        if (!nodes.length) return;
        var firstEl = nodes[0], lastEl = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    });
    window.matchMedia("(min-width: 52rem)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reveals.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  /* ---------- Share (Web Share API, only where it exists) ---------- */
  var shareBtn = document.getElementById("share-btn");
  if (shareBtn && navigator.share) {
    shareBtn.hidden = false;
    shareBtn.addEventListener("click", function () {
      navigator.share({ title: document.title, url: location.href.split("#")[0] }).catch(function () { /* cancelled */ });
    });
  }
})();
