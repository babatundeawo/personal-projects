"use strict";

document.getElementById("year").textContent = new Date().getFullYear();

var prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------------------------------------------------------
   Terminal typing effect — the hero's signature element
--------------------------------------------------------- */
(function typeTerminal() {
  var target = document.getElementById("terminal-body");
  if (!target) return;

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

  if (prefersReducedMotion) {
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
        rendered.replace(/_$/, '') + '<span class="caret"></span>';
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

/* ---------------------------------------------------------
   Count-up stats in the hero
--------------------------------------------------------- */
(function countUp() {
  var targets = document.querySelectorAll("[data-count-to]");
  if (!targets.length) return;

  targets.forEach(function (el) {
    var end = parseInt(el.getAttribute("data-count-to"), 10) || 0;

    if (prefersReducedMotion) {
      el.textContent = end.toLocaleString();
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
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
})();

/* ---------------------------------------------------------
   Scroll reveal for project + about cards
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
   Ambient blueprint grid — a very slow drifting dot field
--------------------------------------------------------- */
(function gridCanvas() {
  var canvas = document.getElementById("grid-canvas");
  if (!canvas || prefersReducedMotion) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var dots = [];
  var spacing = 42;

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

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();
