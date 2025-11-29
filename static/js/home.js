// ========== NEWS CARDS HOVER EFFECT ==========
const newsCards = document.querySelectorAll('.news-card');

newsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        const image = this.querySelector('.news-image');
        if (image) {
            image.style.filter = 'brightness(1.2) saturate(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.news-image');
        if (image) {
            image.style.filter = 'brightness(1) saturate(1)';
        }
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ========== CARD STAGGER ANIMATION ==========
const cards = document.querySelectorAll('.news-card');
let delay = 0;

cards.forEach(card => {
    card.style.animation = `cardEnter 0.6s ease-out ${delay}s both`;
    delay += 0.1;
});

// ========== FILTER FUNCTIONALITY (если будет больше новостей) ==========
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter animation
            newsItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.opacity = '1';
                    item.style.pointerEvents = 'auto';
                } else {
                    item.style.opacity = '0.3';
                    item.style.pointerEvents = 'none';
                }
            });
        });
    });
}

// ========== INFINITE SCROLL (опционально) ==========
let page = 1;
let isLoading = false;

function loadMoreNews() {
    if (isLoading) return;
    isLoading = true;
    
    // Здесь можно добавить AJAX запрос для загрузки новостей
    console.log('Loading page:', page);
    isLoading = false;
}

// ========== SEARCH FUNCTIONALITY ==========
const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.news-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.news-title').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm);
            
            card.style.opacity = isVisible ? '1' : '0.3';
            card.style.pointerEvents = isVisible ? 'auto' : 'none';
            card.style.transition = 'opacity 0.3s ease';
        });
    });
}

// ========== LAZY LOADING INTERSECTION OBSERVER ==========
const lazyLoadOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            lazyLoadObserver.unobserve(card);
        }
    });
}, lazyLoadOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    lazyLoadObserver.observe(card);
});

// ========== SHARE FUNCTIONALITY ==========
function addShareButtons() {
    const cards = document.querySelectorAll('.news-card');
    
    cards.forEach(card => {
        // Здесь можно добавить кнопки поделиться
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.innerHTML = '📤';
        shareBtn.title = 'Share';
        
        // Опционально добавить на карточку
    });
}

// ========== BACK TO TOP BUTTON ==========
function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createBackToTopButton();

// ========== PAGE INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page loaded');
    initFilters();
});