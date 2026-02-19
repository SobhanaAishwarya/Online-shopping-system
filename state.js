// Global State Management

class State {
    constructor() {
        this.listeners = new Map();
        this.state = {
            user: this.loadFromStorage(CONFIG.STORAGE_KEYS.USER, null),
            cart: this.loadFromStorage(CONFIG.STORAGE_KEYS.CART, []),
            wishlist: this.loadFromStorage(CONFIG.STORAGE_KEYS.WISHLIST, []),
            orders: this.loadFromStorage(CONFIG.STORAGE_KEYS.ORDERS, []),
            addresses: this.loadFromStorage(CONFIG.STORAGE_KEYS.ADDRESSES, []),
            theme: this.loadFromStorage(CONFIG.STORAGE_KEYS.THEME, 'light'),
            recentSearches: this.loadFromStorage(CONFIG.STORAGE_KEYS.RECENT_SEARCHES, []),
            recentlyViewed: this.loadFromStorage(CONFIG.STORAGE_KEYS.RECENTLY_VIEWED, []),
            compareList: this.loadFromStorage(CONFIG.STORAGE_KEYS.COMPARE_LIST, []),
            products: [],
            categories: CONFIG.CATEGORIES,
            filters: {
                category: '',
                search: '',
                minPrice: 0,
                maxPrice: 100000,
                brands: [],
                ratings: 0,
                sortBy: 'relevance'
            },
            currentPage: 'home',
            notifications: [],
            loading: false
        };
    }

    loadFromStorage(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error(`Error loading ${key} from storage:`, error);
            return defaultValue;
        }
    }

    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving ${key} to storage:`, error);
        }
    }

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
        
        return () => {
            const callbacks = this.listeners.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }

    notify(key) {
        const callbacks = this.listeners.get(key);
        if (callbacks) {
            callbacks.forEach(callback => callback(this.state[key]));
        }
        
        const allCallbacks = this.listeners.get('*');
        if (allCallbacks) {
            allCallbacks.forEach(callback => callback(this.state));
        }
    }

    setState(updates) {
        Object.keys(updates).forEach(key => {
            this.state[key] = updates[key];
            
            if (CONFIG.STORAGE_KEYS[key.toUpperCase()]) {
                this.saveToStorage(CONFIG.STORAGE_KEYS[key.toUpperCase()], updates[key]);
            }
            
            this.notify(key);
        });
    }

    getState(key = null) {
        return key ? this.state[key] : this.state;
    }

    // Cart Methods
    addToCart(product, quantity = 1) {
        const cart = [...this.state.cart];
        const existingIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
            if (cart[existingIndex].quantity > CONFIG.MAX_QUANTITY_PER_ITEM) {
                cart[existingIndex].quantity = CONFIG.MAX_QUANTITY_PER_ITEM;
            }
        } else {
            cart.push({ ...product, quantity });
        }
        
        this.setState({ cart });
        return true;
    }

    removeFromCart(productId) {
        const cart = this.state.cart.filter(item => item.id !== productId);
        this.setState({ cart });
    }

    updateCartQuantity(productId, quantity) {
        const cart = [...this.state.cart];
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.min(Math.max(1, quantity), CONFIG.MAX_QUANTITY_PER_ITEM);
            this.setState({ cart });
        }
    }

    clearCart() {
        this.setState({ cart: [] });
    }

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.state.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Wishlist Methods
    addToWishlist(product) {
        if (!this.state.wishlist.find(item => item.id === product.id)) {
            const wishlist = [...this.state.wishlist, product];
            this.setState({ wishlist });
        }
    }

    removeFromWishlist(productId) {
        const wishlist = this.state.wishlist.filter(item => item.id !== productId);
        this.setState({ wishlist });
    }

    isInWishlist(productId) {
        return this.state.wishlist.some(item => item.id === productId);
    }

    // Compare Methods
    addToCompare(product) {
        if (this.state.compareList.length >= CONFIG.MAX_COMPARE_ITEMS) {
            return false;
        }
        if (!this.state.compareList.find(item => item.id === product.id)) {
            const compareList = [...this.state.compareList, product];
            this.setState({ compareList });
            return true;
        }
        return false;
    }

    removeFromCompare(productId) {
        const compareList = this.state.compareList.filter(item => item.id !== productId);
        this.setState({ compareList });
    }

    clearCompare() {
        this.setState({ compareList: [] });
    }

    // Recently Viewed
    addToRecentlyViewed(product) {
        let recentlyViewed = this.state.recentlyViewed.filter(item => item.id !== product.id);
        recentlyViewed.unshift(product);
        recentlyViewed = recentlyViewed.slice(0, 10);
        this.setState({ recentlyViewed });
    }

    // Orders
    addOrder(order) {
        const orders = [order, ...this.state.orders];
        this.setState({ orders });
    }

    // User
    setUser(user) {
        this.setState({ user });
    }

    logout() {
        this.setState({ 
            user: null, 
            cart: [], 
            wishlist: [], 
            compareList: [] 
        });
    }

    // Notifications
    addNotification(notification) {
        const notifications = [
            { ...notification, id: Date.now(), timestamp: new Date() },
            ...this.state.notifications
        ];
        this.setState({ notifications });
    }

    removeNotification(id) {
        const notifications = this.state.notifications.filter(n => n.id !== id);
        this.setState({ notifications });
    }
}

const state = new State();
