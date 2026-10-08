/**
 * home.js — the hero terminal typing effect and the stat count-up.
 * Both are progressive enhancements: the HTML already contains the final
 * text and numbers, so nothing is lost without JavaScript.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Terminal ---------- */
  var target = document.getElementById("terminal-body");
  if (target && !reduceMotion) {
    var lines = [
      { text: "$ ls builds", pause: 420 },
      { text: "", pause: 140 },
      { text: "BUILD-001  safe-calculator          stable", pause: 110 },
      { text: "BUILD-002  smart-form-validator     stable", pause: 110 },
      { text: "BUILD-003  student-report-card      stable", pause: 110 },
      { text: "BUILD-004  ai-agent-bootcamp        in progress", pause: 320 },
      { text: "", pause: 140 },
      { text: "$ ", pause: 0 },
    ];
    var rendered = "";
    var lineIndex = 0;
    var charIndex = 0;
    var caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");

    // Keep the final text available to assistive tech while the effect runs.
    var finalText = target.textContent;
    target.setAttribute("aria-label", finalText.replace(/\s+/g, " ").trim());
    target.textContent = "";
    target.appendChild(caret);

    var draw = function () {
      target.textContent = rendered;
      target.appendChild(caret);
    };

    var step = function () {
      if (lineIndex >= lines.length) return;
      var current = lines[lineIndex];
      if (charIndex < current.text.length) {
        rendered += current.text.charAt(charIndex);
        charIndex += 1;
        draw();
        window.setTimeout(step, 14 + Math.random() * 16);
      } else {
        lineIndex += 1;
        charIndex = 0;
        if (lineIndex < lines.length) rendered += "\n";
        draw();
        window.setTimeout(step, current.pause);
      }
    };

    window.setTimeout(step, 500);
  }

  /* ---------- Count-up ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count-to]"));
  if (!counters.length || reduceMotion || !("IntersectionObserver" in window)) return;

  var animate = function (el) {
    var end = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    var duration = 1100;
    var start = null;
    var tick = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  });
  counters.forEach(function (el) {
    io.observe(el);
  });
})();
