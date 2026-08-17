/* ===== DOM Elements ===== */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const themeToggle = document.getElementById("theme-toggle");
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const contactForm = document.getElementById("contact-form");
const yearSpan = document.getElementById("year");

/* ===== Mobile Menu ===== */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Close menu when clicking a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
});

/* ===== Dark / Light Theme ===== */
const savedTheme = localStorage.getItem("selected-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const currentTheme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";
  localStorage.setItem("selected-theme", currentTheme);
});

/* ===== Sticky Header on Scroll ===== */
function scrollHeader() {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

/* ===== Active Link on Scroll ===== */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active-link"));
      if (navLink) navLink.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/* ===== Show Scroll Up Button ===== */
function showScrollUp() {
  if (window.scrollY >= 400) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", showScrollUp);

/* ===== Contact Form Validation ===== */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showError(inputId, message) {
  const errorEl = document.getElementById(`${inputId}-error`);
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  ["name", "email", "message"].forEach((id) => {
    const errorEl = document.getElementById(`${id}-error`);
    if (errorEl) errorEl.textContent = "";
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const statusEl = document.getElementById("form-status");

    let isValid = true;

    if (name.length < 2) {
      showError("name", "Please enter your name (at least 2 characters).");
      isValid = false;
    }

    if (!validateEmail(email)) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    }

    if (message.length < 10) {
      showError("message", "Message should be at least 10 characters.");
      isValid = false;
    }

    if (!isValid) {
      statusEl.textContent = "";
      statusEl.className = "form-status";
      return;
    }

    // Simulate successful submission (no backend)
    statusEl.textContent = "Message sent successfully! I'll get back to you soon.";
    statusEl.className = "form-status success";
    contactForm.reset();

    // Clear success message after a few seconds
    setTimeout(() => {
      statusEl.textContent = "";
      statusEl.className = "form-status";
    }, 5000);
  });
}

/* ===== Current Year in Footer ===== */
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ===== Smooth reveal on scroll (simple) ===== */
const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Make home section visible immediately
const homeSection = document.getElementById("home");
if (homeSection) {
  homeSection.style.opacity = "1";
  homeSection.style.transform = "translateY(0)";
}
