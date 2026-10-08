const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

function updateThemeIcon() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = dark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.toggleAttribute('data-theme', !dark);
  if (!dark) localStorage.setItem('portfolio-theme', 'dark');
  else localStorage.setItem('portfolio-theme', 'light');
  updateThemeIcon();
});

document.querySelectorAll('[data-project]').forEach(link => {
  link.addEventListener('click', () => {
    const project = link.dataset.project;
    document.getElementById('message').value = `Hi Babatunde, I'm interested in the ${project} project.`;
  });
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  formStatus.textContent = `Thanks, ${data.name}! Your message has been captured in this demo.`;
  contactForm.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
