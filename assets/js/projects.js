"use strict";

/* ---------------------------------------------------------
   Search + tag filtering for the project grid
--------------------------------------------------------- */
(function projectFilter() {
  var grid = document.getElementById("project-grid");
  if (!grid) return;

  var searchInput = document.getElementById("project-search");
  var chips = Array.prototype.slice.call(
    document.querySelectorAll(".filter-chip"),
  );
  var cards = Array.prototype.slice.call(
    grid.querySelectorAll(".project-card"),
  );
  var resultsLabel = document.getElementById("filter-results");
  var emptyState = document.getElementById("empty-state");

  var activeTag = "all";
  var query = "";

  function cardMatches(card) {
    var tags = (card.getAttribute("data-tags") || "").toLowerCase();
    var text = card.textContent.toLowerCase();

    var matchesTag = activeTag === "all" || tags.indexOf(activeTag) !== -1;
    var matchesQuery = query === "" || text.indexOf(query) !== -1;

    return matchesTag && matchesQuery;
  }

  function applyFilters() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var matches = cardMatches(card);
      card.classList.toggle("is-filtered-out", !matches);
      if (matches) visibleCount += 1;
    });

    if (resultsLabel) {
      resultsLabel.textContent =
        visibleCount === cards.length
          ? "Showing all " + cards.length + " builds"
          : "Showing " + visibleCount + " of " + cards.length + " builds";
    }

    if (emptyState) {
      emptyState.classList.toggle("is-visible", visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      query = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");
      activeTag = (chip.getAttribute("data-tag") || "all").toLowerCase();
      applyFilters();
    });
  });

  applyFilters();
})();
