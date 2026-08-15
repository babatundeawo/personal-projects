"use strict";

/**
 * animations.js
 * Shared, page-agnostic interactive polish for every hub page.
 * Each block checks for its own target elements before doing
 * anything, so this file is safe to include everywhere.
 */

var prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   Count-up stats
--------------------------------------------------------- */
(function countUp() {
  var targets = document.querySelectorAll("[data-count-to]");
  if (!targets.length) return;

  function animate(el) {
    var end = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    var suffix = el.getAttribute("data-count-suffix") || "";

    if (prefersReducedMotion) {
      el.textContent = end.toLocaleString() + suffix;
      return;
    }

    var start = 0;
    var duration = 900;
    var startTime = null;

    function tick(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(start + (end - start) * eased);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach(animate);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---------------------------------------------------------
   Scroll reveal for any .reveal element
--------------------------------------------------------- */
(function scrollReveal() {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---------------------------------------------------------
   Ambient blueprint grid: a very slow drifting dot field
--------------------------------------------------------- */
(function gridCanvas() {
  var canvas = document.getElementById("grid-canvas");
  if (!canvas || prefersReducedMotion) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var dots = [];
  var spacing = 42;
  var resizeTimer = null;

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildDots();
  }

  function buildDots() {
    dots = [];
    var cols = Math.ceil(window.innerWidth / spacing) + 2;
    var rows = Math.ceil(window.innerHeight / spacing) + 2;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        dots.push({
          x: i * spacing,
          y: j * spacing,
          offset: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  var isDark = document.documentElement.getAttribute("data-theme") !== "light";
  var t = 0;

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    isDark = document.documentElement.getAttribute("data-theme") !== "light";
    ctx.fillStyle = isDark
      ? "rgba(108, 140, 255, 0.35)"
      : "rgba(52, 84, 209, 0.28)";

    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var pulse = Math.sin(t * 0.0006 + d.offset) * 0.5 + 0.5;
      var r = 0.6 + pulse * 1.1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    t += 16;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });
  resize();
  requestAnimationFrame(draw);
})();

/* ---------------------------------------------------------
   Back to top button
--------------------------------------------------------- */
(function backToTop() {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;

  function toggle() {
    if (window.scrollY > 480) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
})();

/* ---------------------------------------------------------
   Reveal the page shell once fonts/layout settle, avoiding a
   flash of unstyled/unpositioned content on slow connections
--------------------------------------------------------- */
document.documentElement.classList.add("js-ready");
