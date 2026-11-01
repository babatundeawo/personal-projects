(function() {
    'use strict';

    // ===== DATA =====
    const skillsData = [
        { name: 'HTML5', icon: 'fab fa-html5', level: 92 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', level: 88 },
        { name: 'JavaScript', icon: 'fab fa-js', level: 82 },
        { name: 'React', icon: 'fab fa-react', level: 70 },
        { name: 'Node.js', icon: 'fab fa-node-js', level: 60 },
        { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 78 },
        { name: 'Tailwind CSS', icon: 'fab fa-tailwind', level: 74 },
        { name: 'Figma', icon: 'fab fa-figma', level: 65 },
    ];

    const projectsData = [
        { title: 'Weather Dashboard', desc: 'Real‑time weather app using OpenWeather API with 5‑day forecast.', icon: 'fas fa-cloud-sun', tags: ['API', 'JavaScript', 'CSS'], link: '#' },
        { title: 'Task Manager', desc: 'Full‑featured task manager with drag & drop, filters, and local storage.', icon: 'fas fa-tasks', tags: ['React', 'Tailwind', 'LocalStorage'], link: '#' },
        { title: 'Portfolio Builder', desc: 'Drag‑and‑drop portfolio builder that lets users create their own site.', icon: 'fas fa-palette', tags: ['Vue', 'Firebase', 'SCSS'], link: '#' },
        { title: 'E‑Commerce Store', desc: 'Mock e‑commerce store with cart, checkout, and product filtering.', icon: 'fas fa-store', tags: ['React', 'API', 'CSS'], link: '#' },
        { title: 'Blog Platform', desc: 'Minimalist blog with markdown support, search, and dark mode.', icon: 'fas fa-blog', tags: ['Next.js', 'MDX', 'Tailwind'], link: '#' },
        { title: 'Chat Application', desc: 'Real‑time chat app using WebSockets with room support.', icon: 'fas fa-comment-dots', tags: ['Node.js', 'Socket.io', 'JavaScript'], link: '#' },
    ];

    // ===== DOM REFS =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('themeToggle');
    const scrollTopBtn = document.getElementById('scrollTop');
    const skillsGrid = document.getElementById('skillsGrid');
    const projectsGrid = document.getElementById('projectsGrid');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const resumeDownload = document.getElementById('resumeDownload');
    const statProjects = document.getElementById('statProjects');
    const statCommits = document.getElementById('statCommits');
    const statCoffee = document.getElementById('statCoffee');

    // ===== THEME =====
    function getTheme() { return localStorage.getItem('theme') || 'light'; }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    setTheme(getTheme());
    themeToggle.addEventListener('click', () => {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });

    // ===== MOBILE NAV =====
    hamburger.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        let current = 'home';
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) current = section.id;
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }

    // ===== NAVBAR SHADOW =====
    function handleNavShadow() {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }

    // ===== SCROLL TO TOP =====
    function handleScrollTopVisibility() {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== RENDER SKILLS =====
    function renderSkills() {
        skillsGrid.innerHTML = '';
        skillsData.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'skill-card reveal';
            if (index < 4) card.classList.add('reveal-delay-' + (index % 3 + 1));
            card.innerHTML = `
                <span class="skill-icon"><i class="${skill.icon}"></i></span>
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level"><span class="fill" data-level="${skill.level}"></span></span>
            `;
            skillsGrid.appendChild(card);
        });
        setTimeout(() => {
            document.querySelectorAll('.skill-card .fill').forEach(bar => {
                const level = parseInt(bar.getAttribute('data-level'), 10);
                bar.style.width = level + '%';
            });
        }, 400);
    }

    // ===== RENDER PROJECTS =====
    function renderProjects() {
        projectsGrid.innerHTML = '';
        projectsData.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            if (index < 3) card.classList.add('reveal-delay-' + (index % 3 + 1));
            card.innerHTML = `
                <div class="project-thumb"><i class="${project.icon}"></i></div>
                <div class="project-body">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="project-tags">${project.tags.map(t => `<span>${t}</span>`).join('')}</div>
                    <a href="${project.link}" class="btn btn-primary" style="padding:10px 24px;font-size:0.9rem;">
                        <i class="fas fa-arrow-right"></i> View Project
                    </a>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // ===== ANIMATE STATS =====
    function animateStats() {
        const targets = [
            { el: statProjects, target: 18, suffix: '+' },
            { el: statCommits, target: 420, suffix: '+' },
            { el: statCoffee, target: 230, suffix: '+' },
        ];
        let animated = false;

        function isInView() {
            const rect = document.getElementById('about').getBoundingClientRect();
            return rect.top < window.innerHeight - 100;
        }

        function startCounters() {
            if (animated || !isInView()) return;
            animated = true;
            targets.forEach(({ el, target, suffix }) => {
                let current = 0;
                const increment = Math.ceil(target / 50);
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= target) { current = target; clearInterval(interval); }
                    el.textContent = current + suffix;
                }, 30);
            });
        }
        window.addEventListener('scroll', startCounters);
        setTimeout(startCounters, 300);
    }

    // ===== SCROLL REVEAL =====
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => observer.observe(el));
    }

    // ===== CONTACT FORM =====
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();

        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'none';

        if (!name || !email || !message) {
            formFeedback.textContent = 'Please fill in all fields.';
            formFeedback.className = 'form-feedback error';
            formFeedback.style.display = 'block';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            formFeedback.textContent = 'Please enter a valid email address.';
            formFeedback.className = 'form-feedback error';
            formFeedback.style.display = 'block';
            return;
        }

        formFeedback.textContent = 'Sending your message…';
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'block';

        setTimeout(() => {
            formFeedback.textContent = '✅ Thanks ' + name + '! Your message was sent successfully.';
            formFeedback.className = 'form-feedback success';
            formFeedback.style.display = 'block';
            contactForm.reset();
        }, 1400);
    });

    // ===== RESUME DOWNLOAD =====
    resumeDownload.addEventListener('click', function(e) {
        e.preventDefault();
        alert('📄 In a real project, this would download resume.pdf from the server.');
    });

    // ===== SCROLL HANDLER =====
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                handleNavShadow();
                handleScrollTopVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll);

    // ===== INIT =====
    window.addEventListener('load', () => {
        updateActiveNav();
        handleNavShadow();
        handleScrollTopVisibility();
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    });

    renderSkills();
    renderProjects();
    animateStats();
    initReveal();

})();