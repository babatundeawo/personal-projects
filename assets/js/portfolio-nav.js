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
      /* localStorage unavailable — theme just won't persist */
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
