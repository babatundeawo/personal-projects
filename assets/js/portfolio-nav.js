/**
 * portfolio-nav.js
 * Shared behaviour for the sticky top bar included on every page:
 *  - keeps a single "light | dark" preference in localStorage so the
 *    whole portfolio (hub + every build) opens in the mode you left it in
 *  - is safe to include on pages that manage their own separate theme
 *    system (it simply does nothing if there's no #portfolio-theme-toggle
 *    button on the page)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "ba-portfolio-theme";
  var root = document.documentElement;

  function getPreferredTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      stored = null;
    }
    if (stored === "light" || stored === "dark") return stored;
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var toggle = document.getElementById("portfolio-theme-toggle");
    if (toggle) {
      toggle.textContent = theme === "light" ? "☀️" : "🌙";
      toggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode",
      );
    }
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* localStorage unavailable: theme just won't persist */
    }
    applyTheme(theme);
  }

  // Apply immediately so there is no flash of the wrong theme.
  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("portfolio-theme-toggle");
    if (!toggle) return;

    applyTheme(getPreferredTheme());

    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current === "light" ? "dark" : "light");
    });
  });
})();

/**
 * Hub-only extensions, additive and safe on every page:
 *  - mobile hamburger menu (only activates if a
 *    .portfolio-topbar__burger button exists on the page)
 *  - active-page highlighting via [data-nav-current] on the
 *    <body>, matched against each nav link's [data-nav-id]
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var burger = document.querySelector(".portfolio-topbar__burger");
    var nav = document.querySelector(".portfolio-topbar__nav");

    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });

      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          burger.focus();
        }
      });
    }

    var current = document.body.getAttribute("data-nav-current");
    if (current) {
      document.querySelectorAll("[data-nav-id]").forEach(function (link) {
        if (link.getAttribute("data-nav-id") === current) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        }
      });
    }
  });
})();
