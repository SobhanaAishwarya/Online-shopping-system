// Home Page

let currentSlide = 0;
const heroSlides = [
    {
        title: "iPhone 15 Pro Max",
        subtitle: "Titanium Design. A17 Pro Chip.",
        discount: "15% OFF",
        image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=1200&h=600&fit=crop&q=80",
        category: "electronics"
    },
    {
        title: "Samsung Galaxy S24 Ultra",
        subtitle: "Premium Flagship with S Pen",
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&h=600&fit=crop&q=80",
        category: "electronics"
    },
    {
        title: "Nike Air Max Collection",
        subtitle: "Comfort Meets Style",
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop&q=80",
        category: "sports"
    },
    {
        title: "Premium Home Appliances",
        subtitle: "Smart Kitchen Solutions",
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=1200&h=600&fit=crop&q=80",
        category: "home"
    }
];

async function renderHomePage() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="hero-carousel-container">
            <div class="hero-carousel">
                ${heroSlides.map((slide, index) => `
                    <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background: url('${slide.image}') center/cover no-repeat;">
                        <div class="hero-slide-content">
                            <span class="hero-discount-badge">${slide.discount}</span>
                            <h1>${slide.title}</h1>
                            <p>${slide.subtitle}</p>
                            <button class="btn btn-primary btn-large" onclick="navigateTo('category', '${slide.category}')">
                                Shop Now →
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-btn prev" onclick="changeSlide(-1)">‹</button>
            <button class="carousel-btn next" onclick="changeSlide(1)">›</button>
            <div class="carousel-dots">
                ${heroSlides.map((_, index) => `
                    <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Featured Products</h2>
            <div class="product-scroll" id="bestsellers">
                <div class="skeleton-grid">
                    ${Array(6).fill('<div class="skeleton-card"></div>').join('')}
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Shop by Category</h2>
            <div class="category-grid">
                ${CONFIG.CATEGORIES.map(cat => `
                    <div class="category-card" onclick="navigateTo('category', '${cat.id}')">
                        <div class="category-icon">${cat.icon}</div>
                        <div class="category-name">${cat.name}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Top Rated Products</h2>
            <div class="product-grid" id="topRated">
                <div class="skeleton-grid">
                    ${Array(8).fill('<div class="skeleton-card"></div>').join('')}
                </div>
            </div>
        </div>
    `;

    // Load products
    loadBestsellers();
    loadTopRated();

    // Start auto-slide
    startAutoSlide();
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

let autoSlideInterval;

function startAutoSlide() {
    // Clear any existing interval
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }

    // Auto-slide every 5 seconds
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Make functions global
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

async function loadBestsellers() {
    const products = await api.getFeaturedProducts();
    const container = document.getElementById('bestsellers');

    container.innerHTML = `
        <div class="product-scroll-inner">
            ${products.map(product => createProductCard(product)).join('')}
        </div>
    `;
}

async function loadTopRated() {
    const products = await api.getProducts({ sortBy: 'rating' });
    const topProducts = products.slice(0, 8);
    const container = document.getElementById('topRated');

    container.innerHTML = topProducts.map(product => createProductCard(product)).join('');
}
