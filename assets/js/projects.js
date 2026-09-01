"use strict";

/* ---------------------------------------------------------
   Search filtering for the flat project directory.
   No tag/category filtering — this page just points to
   GitHub, it doesn't sort projects into categories.
--------------------------------------------------------- */
(function projectDirectoryFilter() {
  var directory = document.getElementById("project-directory");
  if (!directory) return;

  var searchInput = document.getElementById("project-search");
  var groups = Array.prototype.slice.call(
    directory.querySelectorAll(".project-group"),
  );
  var items = Array.prototype.slice.call(
    directory.querySelectorAll(".dir-item"),
  );
  var resultsLabel = document.getElementById("filter-results");
  var emptyState = document.getElementById("empty-state");
  var totalCount = items.length;

  var query = "";

  function itemMatches(item) {
    if (query === "") return true;
    var text = item.textContent.toLowerCase();
    return text.indexOf(query) !== -1;
  }

  function applyFilter() {
    var visibleCount = 0;

    groups.forEach(function (group) {
      var groupItems = Array.prototype.slice.call(
        group.querySelectorAll(".dir-item"),
      );
      var groupVisible = 0;

      groupItems.forEach(function (item) {
        var matches = itemMatches(item);
        item.classList.toggle("is-filtered-out", !matches);
        if (matches) {
          groupVisible += 1;
          visibleCount += 1;
        }
      });

      group.classList.toggle("is-empty", groupVisible === 0);
    });

    if (resultsLabel) {
      resultsLabel.textContent =
        visibleCount === totalCount
          ? "Showing all " + totalCount + " projects"
          : "Showing " + visibleCount + " of " + totalCount + " projects";
    }

    if (emptyState) {
      emptyState.classList.toggle("is-visible", visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      query = searchInput.value.trim().toLowerCase();
      applyFilter();
    });
  }

  applyFilter();
})();
