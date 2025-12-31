document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selectors ---
    const mainPostsContainer = document.getElementById('main-posts');
    const trendingList = document.getElementById('trending-list');

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
        // Filter for Gear posts
        const gearPosts = window.posts.filter(post => post.category === 'Gear');

        // Main Posts (Gear posts)
        if(mainPostsContainer){
            mainPostsContainer.innerHTML = gearPosts.map(createPostCard).join('');
        }

        // Trending List (Top 5 posts)
        if(trendingList){
            trendingList.innerHTML = window.posts.slice(0, 5).map(createTrendingItem).join('');
        }
    }
});
