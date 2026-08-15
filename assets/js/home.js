"use strict";

/* ---------------------------------------------------------
   Terminal typing effect: the hero's signature element
--------------------------------------------------------- */
(function typeTerminal() {
  var target = document.getElementById("terminal-body");
  if (!target) return;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  var lines = [
    { text: "> node build --list", pause: 400 },
    { text: "", pause: 150 },
    { text: "BUILD-001  safe-calculator          stable", pause: 120 },
    { text: "BUILD-002  smart-form-validator      stable", pause: 120 },
    { text: "BUILD-003  student-report-card       stable", pause: 120 },
    { text: "BUILD-004  ai-agent-bootcamp     in progress", pause: 300 },
    { text: "", pause: 150 },
    { text: "> _", pause: 0 },
  ];

  if (reduceMotion) {
    target.textContent = lines.map((l) => l.text).join("\n");
    return;
  }

  target.textContent = "";
  var lineIndex = 0;
  var charIndex = 0;
  var rendered = "";

  function step() {
    if (lineIndex >= lines.length) {
      target.innerHTML =
        rendered.replace(/_$/, "") + '<span class="caret"></span>';
      return;
    }

    var current = lines[lineIndex];

    if (charIndex < current.text.length) {
      rendered += current.text.charAt(charIndex);
      charIndex += 1;
      target.textContent = rendered;
      setTimeout(step, 16 + Math.random() * 18);
    } else {
      rendered += "\n";
      lineIndex += 1;
      charIndex = 0;
      setTimeout(step, current.pause);
    }
  }

  setTimeout(step, 350);
})();
