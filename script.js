// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
root.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = root.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if(!themeToggle) return;
    if(theme === 'dark') {
        themeToggle.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
    } else {
        themeToggle.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
}

// Search and Filter Logic (Home Page Only)
const searchInput = document.getElementById('search-input');
const categoryPills = document.querySelectorAll('.category-pill');
const appCards = document.querySelectorAll('.app-card');

if(searchInput && categoryPills && appCards) {
    let currentCategory = 'all';

    function filterApps() {
        const query = searchInput.value.toLowerCase();

        appCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = title.includes(query);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                // Simple fade in animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterApps);

    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active from all
            categoryPills.forEach(p => p.classList.remove('active'));
            // Add to clicked
            pill.classList.add('active');
            
            currentCategory = pill.dataset.filter;
            filterApps();
        });
    });
}

// Lightbox/Carousel Logic (Detail Pages Only)
// Scroll animation placeholder for future expansion
if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.content-section').forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: { trigger: sec, start: "top 80%" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
    });
}
