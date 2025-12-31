document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selectors ---
    const themeToggleButton = document.querySelector('.theme-toggle');
    const body = document.body;
    const heroGrid = document.getElementById('hero-grid');
    const mainPostsContainer = document.getElementById('main-posts');
    const trendingList = document.getElementById('trending-list');
    const progressBar = document.getElementById('reading-progress-bar');
    const backToTopButton = document.getElementById('back-to-top');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- Theme Toggle ---
    const applyTheme = (theme) => {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'dark-theme';
        const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
        applyTheme(newTheme);
    });

    // Apply saved theme on load
    applyTheme(localStorage.getItem('theme') || 'dark-theme');


    // --- Dynamic Post Loading ---
    const createBentoItem = (post) => `
        <div class="bento-item" style="background-image: url('${post.imageUrl}');">
            <a href="#" class="bento-item-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
            </a>
        </div>
    `;

    const createPostCard = (post) => `
        <div class="post-card">
            <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
            <div class="post-card-content">
                <span class="category">${post.category}</span>
                <h3><a href="#">${post.title}</a></h3>
                <p class="excerpt">${post.excerpt}</p>
                <span class="date">${post.date}</span>
            </div>
        </div>
    `;

    const createTrendingItem = (post) => `
        <li><a href="#">${post.title}</a></li>
    `;

    if (typeof window.posts !== 'undefined' && window.posts.length > 0) {
        // Hero Grid (Top 3 posts)
        if(heroGrid) {
            heroGrid.innerHTML = window.posts.slice(0, 3).map(createBentoItem).join('');
        }

        // Main Posts (All posts)
        if(mainPostsContainer){
            mainPostsContainer.innerHTML = window.posts.map(createPostCard).join('');
        }

        // Trending List (Top 5 posts)
        if(trendingList){
            trendingList.innerHTML = window.posts.slice(0, 5).map(createTrendingItem).join('');
        }
    }


    // --- Reading Progress Bar ---
    const updateProgressBar = () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollPercent = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
        if(progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    };


    // --- Back to Top Button ---
    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- Scroll Event Listener ---
    window.addEventListener('scroll', () => {
        updateProgressBar();
        toggleBackToTopButton();
    });


    // --- Hamburger Menu ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

});