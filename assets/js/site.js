/**
 * site.js — shared behaviour for every hub page.
 *
 * The very first theme paint happens in an inline <head> script (so there
 * is no flash of the wrong theme); this file wires up everything else:
 * theme toggle, adaptive header, mobile menu, scroll progress, reveals,
 * cursor-aware card glow, magnetic buttons and the toast helper.
 *
 * Every block is guarded, so the file is safe on any page.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "ba-portfolio-theme"; // shared with the legacy project pages
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function syncThemeButton() {
    if (!themeBtn) return;
    var isLight = currentTheme() === "light";
    themeBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* Storage blocked (private mode): the choice just won't persist. */
    }
    syncThemeButton();
  }

  syncThemeButton();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      // Use the View Transitions API for a smooth cross-fade where available.
      if (document.startViewTransition && !reduceMotion) {
        document.startViewTransition(function () {
          setTheme(next);
        });
      } else {
        setTheme(next);
      }
    });
  }

  // Follow the system setting live, but only while the visitor has not chosen.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var onSystemChange = function (event) {
      var stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch (err) {
        stored = null;
      }
      if (stored !== "light" && stored !== "dark") {
        root.setAttribute("data-theme", event.matches ? "light" : "dark");
        syncThemeButton();
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
  }

  /* ---------- Adaptive header + scroll progress + back-to-top ---------- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".progress");
  var toTop = document.getElementById("to-top");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (progress) progress.style.setProperty("--progress", max > 0 ? String(Math.min(y / max, 1)) : "0");
    if (toTop) toTop.classList.toggle("is-visible", y > 640);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var inertTargets = Array.prototype.slice.call(document.querySelectorAll("main, .site-footer, .to-top"));

  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    inertTargets.forEach(function (el) {
      if (open) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        burger.focus();
      }
    });
    // Close automatically if the window grows past the mobile breakpoint.
    window.matchMedia("(min-width: 860px)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  /* ---------- Scroll reveals (staggered via --i) ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reveals.length) {
    reveals.forEach(function (el) {
      if (el.dataset.i) el.style.setProperty("--i", el.dataset.i);
    });
    if (!("IntersectionObserver" in window) || reduceMotion) {
      reveals.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        io.observe(el);
      });
    }
  }

  /* ---------- Cursor-aware effects (fine pointers only) ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".card--glow").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", event.clientX - rect.left + "px");
        card.style.setProperty("--my", event.clientY - rect.top + "px");
      });
    });

    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (event) {
        var rect = el.getBoundingClientRect();
        var dx = (event.clientX - (rect.left + rect.width / 2)) * 0.18;
        var dy = (event.clientY - (rect.top + rect.height / 2)) * 0.28;
        el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });

    var ambient = document.querySelector(".ambient");
    if (ambient) {
      window.addEventListener(
        "pointermove",
        function (event) {
          var x = (event.clientX / window.innerWidth - 0.5) * 80;
          var y = (event.clientY / window.innerHeight - 0.5) * 50;
          ambient.style.setProperty("--gx", x.toFixed(0) + "px");
          ambient.style.setProperty("--gy", y.toFixed(0) + "px");
        },
        { passive: true }
      );
    }
  }

  /* ---------- Toast helper: window.BA.toast(message, type) ---------- */
  var toastHost = document.getElementById("toasts");

  function toast(message, type) {
    if (!toastHost) return;
    var el = document.createElement("div");
    el.className = "toast" + (type ? " toast--" + type : "");
    el.textContent = message;
    toastHost.appendChild(el);
    window.setTimeout(function () {
      el.classList.add("is-leaving");
      window.setTimeout(function () {
        el.remove();
      }, 300);
    }, 3200);
  }

  window.BA = { toast: toast };
})();
