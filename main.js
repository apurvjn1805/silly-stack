const projects = [
    {
        name: "TrumpRx",
        description: "A clean, government-style dashboard for tracking simple health metrics. Minimalist and fast.",
        link: "https://trumprx.gov/",
        tags: ["React", "Tailwind", "Dashboard"]
    },
    {
        name: "Side Hustle Tracker",
        description: "Tracking income streams with a beautiful dark mode UI. Inspired by Pankaj Tanwar's site.",
        link: "https://www.pankajtanwar.in/side-hustles",
        tags: ["Vue.js", "Chart.js", "Finance"]
    },
    {
        name: "Silly Stack",
        description: "The meta-project! A directory of all my small experiments and side quests.",
        link: "#",
        tags: ["Vanilla JS", "CSS Grid", "Portfolio"]
    },
    {
        name: "Neon Notes",
        description: "A cyberpunk-themed note-taking app that glows in the dark. Totally impractical but cool.",
        link: "#",
        tags: ["Design", "CSS Animations"]
    },
    {
        name: "Coffee Typer",
        description: "Test your typing speed while listening to ambient coffee shop sounds.",
        link: "#",
        tags: ["JS", "Audio API"]
    },
    {
        name: "Pixel Weather",
        description: "Weather forecast but everything is 8-bit pixel art animations.",
        link: "#",
        tags: ["Canvas", "API"]
    },
    {
        name: "The Gift",
        description: "A special digital release for a special occasion.",
        link: "https://rajruparoychowdhury-png.github.io/the-gift/",
        tags: ["Animation", "Gift"]
    },
    {
        name: "Spirit Animal",
        description: "Find your inner buddy! A fun way to discover your spirit animal.",
        link: "https://rajrupa-browserstack.github.io/spirit-animal/",
        tags: ["Fun", "Game"]
    }
];

// DOM Elements
// DOM Elements Dyanmic
const grid = document.getElementById('project-grid');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeMenu = document.getElementById('theme-menu');
const themeOptions = document.querySelectorAll('.theme-option');
const currentThemeIcon = document.getElementById('current-theme-icon');

// Icons (Simple SVG strings for injection)
const icons = {
    light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    realDark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7v1"/><path d="M5.6 5.6l.7.7"/><path d="M18.4 5.6l-.7.7"/><path d="M12 12v6"/><path d="M12 12a5 5 0 0 1 5-5"/><path d="M12 12a5 5 0 0 0-5-5"/></svg>`
};

// Render Projects
function renderProjects() {
    grid.innerHTML = projects.map(project => `
        <a href="${project.link}" class="card" target="_blank" rel="noopener noreferrer">
            <div class="card-header">
                <h3 class="card-title">${project.name}</h3>
                <svg class="card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>
            <p class="card-desc">${project.description}</p>
            <div class="card-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </a>
    `).join('');
}

// Theme Logic
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update Icon
    if (theme === 'real-dark') {
        currentThemeIcon.innerHTML = icons.realDark;
    } else if (theme === 'dark') {
        currentThemeIcon.innerHTML = icons.dark;
    } else {
        currentThemeIcon.innerHTML = icons.light;
    }

    // Update Active State in Menu
    themeOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.value === theme) {
            option.classList.add('selected');
        }
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let defaultTheme = 'light';

    if (savedTheme) {
        defaultTheme = savedTheme;
    } else if (prefersDark) {
        defaultTheme = 'dark';
    }

    setTheme(defaultTheme);
}

// Dropdown Logic
themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = themeToggleBtn.getAttribute('aria-expanded') === 'true';
    themeToggleBtn.setAttribute('aria-expanded', !isExpanded);
    themeMenu.classList.toggle('active');
    themeMenu.classList.toggle('hidden'); // Logic support for both classes just in case
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!themeToggleBtn.contains(e.target) && !themeMenu.contains(e.target)) {
        themeMenu.classList.remove('active');
        themeMenu.classList.add('hidden');
        themeToggleBtn.setAttribute('aria-expanded', 'false');
    }
});

// Handle Option Click
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedTheme = option.dataset.value;
        setTheme(selectedTheme);
        // Close menu
        themeMenu.classList.remove('active');
        themeMenu.classList.add('hidden');
        themeToggleBtn.setAttribute('aria-expanded', 'false');
    });
});

// Initialize
renderProjects();
initTheme();
