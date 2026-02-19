// App Configuration
const CONFIG = {
    APP_NAME: 'Flipkart Clone',
    API_BASE_URL: '/api',
    CURRENCY: '₹',
    DEFAULT_LOCATION: 'India',
    
    // Feature Flags
    FEATURES: {
        DARK_MODE: true,
        CHAT_SUPPORT: true,
        AI_RECOMMENDATIONS: true,
        SELLER_DASHBOARD: true,
        ADMIN_PANEL: true,
        COUPONS: true,
        WISHLIST: true,
        COMPARE: true,
        REVIEWS: true,
        NOTIFICATIONS: true
    },
    
    // Shipping
    FREE_DELIVERY_THRESHOLD: 500,
    SHIPPING_CHARGE: 40,
    
    // Pagination
    PRODUCTS_PER_PAGE: 24,
    
    // Search
    SEARCH_DEBOUNCE: 300,
    MIN_SEARCH_LENGTH: 2,
    
    // Cart
    MAX_QUANTITY_PER_ITEM: 10,
    
    // Comparison
    MAX_COMPARE_ITEMS: 4,
    
    // Coupons
    COUPONS: [
        { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 0, maxDiscount: 500 },
        { code: 'SAVE20', discount: 20, type: 'percentage', minOrder: 1000, maxDiscount: 1000 },
        { code: 'MEGA50', discount: 50, type: 'percentage', minOrder: 2000, maxDiscount: 2000 },
        { code: 'FLASH100', discount: 100, type: 'fixed', minOrder: 500, maxDiscount: 100 },
        { code: 'SUPER500', discount: 500, type: 'fixed', minOrder: 5000, maxDiscount: 500 }
    ],
    
    // Categories
    CATEGORIES: [
        { id: 'electronics', name: 'Electronics', icon: '📱' },
        { id: 'fashion', name: 'Fashion', icon: '👕' },
        { id: 'home', name: 'Home & Furniture', icon: '🏠' },
        { id: 'beauty', name: 'Beauty', icon: '💄' },
        { id: 'toys', name: 'Toys', icon: '🧸' },
        { id: 'sports', name: 'Sports', icon: '⚽' },
        { id: 'books', name: 'Books', icon: '📚' },
        { id: 'grocery', name: 'Grocery', icon: '🛒' }
    ],
    
    // Delivery Options
    DELIVERY_SPEEDS: {
        standard: { name: 'Standard Delivery', days: '5-7 days', charge: 0 },
        express: { name: 'Express Delivery', days: '2-3 days', charge: 50 },
        sameDay: { name: 'Same Day Delivery', days: 'Today', charge: 100 }
    },
    
    // Order Status
    ORDER_STATUSES: {
        pending: { label: 'Order Placed', color: '#2874f0' },
        confirmed: { label: 'Confirmed', color: '#2874f0' },
        packed: { label: 'Packed', color: '#ff9f00' },
        shipped: { label: 'Shipped', color: '#ff9f00' },
        delivered: { label: 'Delivered', color: '#388e3c' },
        cancelled: { label: 'Cancelled', color: '#f44336' },
        returned: { label: 'Returned', color: '#f44336' }
    },
    
    // User Roles
    USER_ROLES: {
        CUSTOMER: 'customer',
        SELLER: 'seller',
        ADMIN: 'admin'
    },
    
    // Storage Keys
    STORAGE_KEYS: {
        USER: 'user',
        CART: 'cart',
        WISHLIST: 'wishlist',
        ORDERS: 'orders',
        ADDRESSES: 'addresses',
        THEME: 'theme',
        RECENT_SEARCHES: 'recentSearches',
        RECENTLY_VIEWED: 'recentlyViewed',
        COMPARE_LIST: 'compareList'
    }
};
