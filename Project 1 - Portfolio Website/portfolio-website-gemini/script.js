// --- Dark Mode Switching with Persistent LocalStorage ---
const themeToggleBtn = document.getElementById("theme-toggle");

// Initialize theme state
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

themeToggleBtn.addEventListener("click", () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
});

// --- Category Filtering for Projects ---
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Active class state
    filterButtons.forEach(b => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");

    const filter = btn.getAttribute("data-filter");

    projectItems.forEach(item => {
      const categories = item.getAttribute("data-category");
      if (filter === "all" || categories.includes(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// --- Contact Form Handling ---
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  alert(`Thank you, ${name}! Your message has been received.`);
  e.target.reset();
});
