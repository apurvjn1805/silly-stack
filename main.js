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
    }
];

// DOM Elements
const grid = document.getElementById('project-grid');
const themeToggle = document.getElementById('theme-toggle');

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
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Initialize
renderProjects();
initTheme();
