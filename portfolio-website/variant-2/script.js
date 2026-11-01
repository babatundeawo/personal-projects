// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Theme toggle (dark / light) — persists for the session
// ============================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = sessionStorage.getItem('portfolio-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  sessionStorage.setItem('portfolio-theme', next);
});

// ============================================
// Mobile nav burger
// ============================================
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
navBurger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================
// Hero typing effect
// ============================================
const typeLine = document.getElementById('typeLine');
const phrases = ["Hi, I'm Dara.", "I build for the web."];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typeLine.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typeLine.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 65);
}
typeLoop();

// ============================================
// Scroll reveal + skill bar fill (IntersectionObserver)
// ============================================
document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// Project filtering
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ============================================
// Contact form validation
// ============================================
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const wrapper = field.closest('.field');
  const errorEl = form.querySelector(`.error-msg[data-for="${fieldName}"]`);
  if (message) {
    wrapper.classList.add('invalid');
    errorEl.textContent = message;
  } else {
    wrapper.classList.remove('invalid');
    errorEl.textContent = '';
  }
}

function validate() {
  let valid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name) { setError('name', 'Please enter your name.'); valid = false; }
  else setError('name', '');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) { setError('email', 'Please enter your email.'); valid = false; }
  else if (!emailPattern.test(email)) { setError('email', 'That email doesn\'t look right.'); valid = false; }
  else setError('email', '');

  if (!message || message.length < 10) { setError('message', 'Message should be at least 10 characters.'); valid = false; }
  else setError('message', '');

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) {
    formStatus.textContent = '';
    return;
  }
  // Placeholder: no backend wired up yet — swap this for a real submit handler.
  formStatus.textContent = `Thanks, ${form.name.value.trim()}! Your message is ready to send once a backend is connected.`;
  form.reset();
});

// ============================================
// Scroll-to-top button
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
