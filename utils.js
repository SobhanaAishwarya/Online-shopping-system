// Utility Functions

// Format currency
function formatINR(amount) {
    return `${CONFIG.CURRENCY}${amount.toLocaleString('en-IN')}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Toast notification
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Calculate discount percentage
function calculateDiscount(original, discounted) {
    return Math.round(((original - discounted) / original) * 100);
}

// Generate unique ID
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format date
function formatDate(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-IN', options);
}

// Format time ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [name, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return `${interval} ${name}${interval > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'Just now';
}

// Validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone
function isValidPhone(phone) {
    return /^[6-9]\d{9}$/.test(phone);
}

// Validate PIN code
function isValidPincode(pin) {
    return /^[1-9][0-9]{5}$/.test(pin);
}

// Generate stars rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let html = '';
    for (let i = 0; i < fullStars; i++) html += '⭐';
    if (hasHalfStar) html += '⭐';
    for (let i = 0; i < emptyStars; i++) html += '☆';
    
    return html;
}

// Truncate text
function truncate(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

// Shuffle array
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Group by key
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) result[group] = [];
        result[group].push(item);
        return result;
    }, {});
}

// Deep clone
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Get delivery date
function getDeliveryDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return formatDate(date);
}

// Calculate shipping
function calculateShipping(total) {
    return total >= CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : CONFIG.SHIPPING_CHARGE;
}

// Apply coupon
function applyCoupon(couponCode, total) {
    const coupon = CONFIG.COUPONS.find(c => c.code === couponCode);
    
    if (!coupon) {
        return { success: false, message: 'Invalid coupon code' };
    }
    
    if (total < coupon.minOrder) {
        return { 
            success: false, 
            message: `Minimum order of ${formatINR(coupon.minOrder)} required` 
        };
    }
    
    let discount = 0;
    if (coupon.type === 'percentage') {
        discount = Math.min((total * coupon.discount) / 100, coupon.maxDiscount);
    } else {
        discount = coupon.discount;
    }
    
    return {
        success: true,
        discount: Math.round(discount),
        message: `Coupon applied! You saved ${formatINR(discount)}`
    };
}

// Search and highlight
function highlightText(text, query) {
    if (!query) return escapeHtml(text);
    const regex = new RegExp(`(${query})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

// Local storage helpers
function getFromStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}

// Image loader with fallback
function loadImage(src, fallback = 'https://via.placeholder.com/300x300?text=No+Image') {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(fallback);
        img.src = src;
    });
}

// Share on social media
function shareOnSocial(platform, product) {
    const url = window.location.href;
    const text = `Check out ${product.title} on Flipkart Clone!`;
    
    const urls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `ORD${timestamp}${random}`.toUpperCase();
}
