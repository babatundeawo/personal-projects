/**
 * projects.js: search and collection filters for the project directory.
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
  var activeGroup = "all";

  items.forEach(function (item) {
    var a = item.querySelector(".dir-item__name");
    a.dataset.label = a.textContent;
  });

  function highlight(a, query) {
    var text = a.dataset.label;
    while (a.firstChild) a.removeChild(a.firstChild);
    var at = query ? text.toLowerCase().indexOf(query) : -1;
    if (at < 0) { a.appendChild(document.createTextNode(text)); return; }
    a.appendChild(document.createTextNode(text.slice(0, at)));
    var mark = document.createElement("mark");
    mark.textContent = text.slice(at, at + query.length);
    a.appendChild(mark);
    a.appendChild(document.createTextNode(text.slice(at + query.length)));
  }

  function apply() {
    var query = input.value.trim().toLowerCase();
    var shown = 0;
    groups.forEach(function (group) {
      var inGroup = activeGroup === "all" || group.dataset.group === activeGroup;
      var visibleHere = 0;
      group.querySelectorAll(".dir-item").forEach(function (item) {
        var a = item.querySelector(".dir-item__name");
        var match = inGroup && (!query || a.dataset.label.toLowerCase().indexOf(query) !== -1);
        item.classList.toggle("is-hidden", !match);
        if (match) { visibleHere += 1; highlight(a, query); }
      });
      group.classList.toggle("is-empty", visibleHere === 0);
      shown += visibleHere;
    });
    label.textContent = shown === total ? "Showing all " + total + " projects" : "Showing " + shown + " of " + total + " projects";
    empty.hidden = shown !== 0;
  }

  function reset() {
    input.value = "";
    activeGroup = "all";
    filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.group === "all" ? "true" : "false"); });
    apply();
  }

  input.addEventListener("input", apply);
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeGroup = btn.dataset.group;
      filterButtons.forEach(function (other) { other.setAttribute("aria-pressed", other === btn ? "true" : "false"); });
      apply();
    });
  });
  if (clear) clear.addEventListener("click", function () { reset(); input.focus(); });

  // "/" or Ctrl/Cmd + K jumps to the search box (unless you are already typing somewhere).
  document.addEventListener("keydown", function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (document.activeElement && document.activeElement.isContentEditable);
    var combo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
    if ((e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) || combo) {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (e.key === "Escape" && document.activeElement === input && input.value) {
      input.value = "";
      apply();
    }
  });

  apply();
})();
