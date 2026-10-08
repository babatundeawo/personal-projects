/**
 * projects.js — search and collection filters for the project directory.
 * Without JavaScript every project stays visible; this only adds filtering.
 */
(function () {
  "use strict";

  var directory = document.getElementById("project-directory");
  if (!directory) return;

  var input = document.getElementById("project-search");
  var label = document.getElementById("filter-results");
  var empty = document.getElementById("empty-state");
  var clear = document.getElementById("clear-filters");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  var groups = Array.prototype.slice.call(directory.querySelectorAll(".group"));
  var items = Array.prototype.slice.call(directory.querySelectorAll(".dir-item"));
  var total = items.length;

  // Remember each link's original text so highlights can be rebuilt cleanly.
  items.forEach(function (item) {
    var a = item.querySelector("a");
    a.dataset.label = a.textContent;
  });

  var activeGroup = "all";

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function highlight(a, query) {
    var text = a.dataset.label;
    if (!query) {
      a.textContent = text;
      return;
    }
    var at = text.toLowerCase().indexOf(query);
    a.innerHTML =
      escapeHtml(text.slice(0, at)) +
      "<mark>" + escapeHtml(text.slice(at, at + query.length)) + "</mark>" +
      escapeHtml(text.slice(at + query.length));
  }

  function apply() {
    var query = input.value.trim().toLowerCase();
    var shown = 0;

    groups.forEach(function (group) {
      var inGroup = activeGroup === "all" || group.dataset.group === activeGroup;
      var visibleHere = 0;
      group.querySelectorAll(".dir-item").forEach(function (item) {
        var a = item.querySelector("a");
        var match = inGroup && (!query || a.dataset.label.toLowerCase().indexOf(query) !== -1);
        item.classList.toggle("is-hidden", !match);
        if (match) {
          visibleHere += 1;
          highlight(a, query);
        }
      });
      group.classList.toggle("is-empty", visibleHere === 0);
      shown += visibleHere;
    });

    label.textContent =
      shown === total
        ? "Showing all " + total + " projects"
        : "Showing " + shown + " of " + total + " projects";
    empty.hidden = shown !== 0;
  }

  input.addEventListener("input", apply);

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeGroup = btn.dataset.group;
      filterButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", other === btn ? "true" : "false");
      });
      apply();
    });
  });

  clear.addEventListener("click", function () {
    input.value = "";
    activeGroup = "all";
    filterButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.group === "all" ? "true" : "false");
    });
    apply();
    input.focus();
  });

  // "/" jumps to search, Escape clears it (the way most dev tools behave).
  document.addEventListener("keydown", function (event) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";
    if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      input.focus();
      input.select();
    } else if (event.key === "Escape" && document.activeElement === input && input.value) {
      input.value = "";
      apply();
    }
  });
})();
