// Router - Client-side routing

const routes = {
    'home': renderHomePage,
    'product': renderProductPage,
    'cart': renderCartPage,
    'wishlist': renderWishlistPage,
    'orders': renderOrdersPage,
    'account': renderAccountPage,
    'seller': renderSellerPage,
    'admin': renderAdminPage,
    'category': renderCategoryPage,
    'search': renderSearchPage,
    'checkout': renderCheckoutPage
};

let currentRoute = 'home';
let currentParams = null;

function navigateTo(page, params = null) {
    currentRoute = page;
    currentParams = params;
    
    // Update URL without reload
    const url = params ? `#/${page}/${params}` : `#/${page}`;
    window.history.pushState({ page, params }, '', url);
    
    // Render page
    renderPage();
}

function renderPage() {
    const handler = routes[currentRoute];
    
    if (handler) {
        handler(currentParams);
    } else {
        renderHomePage();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    if (event.state) {
        currentRoute = event.state.page;
        currentParams = event.state.params;
        renderPage();
    }
});

// Parse initial URL
function parseInitialRoute() {
    const hash = window.location.hash.slice(1); // Remove #
    if (!hash || hash === '/') {
        return { page: 'home', params: null };
    }
    
    const parts = hash.split('/').filter(p => p);
    return {
        page: parts[0] || 'home',
        params: parts[1] || null
    };
}

// Initialize router
function initRouter() {
    const { page, params } = parseInitialRoute();
    navigateTo(page, params);
}

// Make navigateTo global
window.navigateTo = navigateTo;

// Category Page
async function renderCategoryPage(categoryId) {
    const app = document.getElementById('app');
    const category = state.getState('categories').find(c => c.id === categoryId);
    
    app.innerHTML = `
        <div class="section">
            <h1>${category ? category.name : 'Products'}</h1>
            
            <div style="display: grid; grid-template-columns: 250px 1fr; gap: 24px; margin-top: 24px;">
                <!-- Filters -->
                <div class="filter-sidebar">
                    <div class="filter-section">
                        <div class="filter-title">Price</div>
                        <input type="range" min="0" max="100000" step="1000" class="price-slider" id="priceRange" oninput="updatePriceFilter(this.value)">
                        <div style="font-size: 12px; margin-top: 8px;">₹0 - ₹<span id="priceValue">100000</span></div>
                    </div>
                    
                    <div class="filter-section">
                        <div class="filter-title">Rating</div>
                        ${[4, 3, 2, 1].map(rating => `
                            <label class="filter-option">
                                <input type="radio" name="rating" value="${rating}" onchange="updateRatingFilter(${rating})">
                                <span>${rating}⭐ & above</span>
                            </label>
                        `).join('')}
                    </div>
                    
                    <button class="btn" style="width: 100%;" onclick="clearCategoryFilters()">Clear Filters</button>
                </div>
                
                <!-- Products -->
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <div id="productCount">Loading...</div>
                        <select class="input" style="width: auto;" onchange="updateSort(this.value)">
                            <option value="relevance">Sort by: Relevance</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Rating</option>
                            <option value="popular">Popularity</option>
                        </select>
                    </div>
                    
                    <div class="product-grid" id="categoryProducts">
                        <div class="skeleton-grid">
                            ${Array(12).fill('<div class="skeleton-card"></div>').join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    loadCategoryProducts(categoryId);
}

async function loadCategoryProducts(categoryId) {
    const filters = state.getState('filters');
    const products = await api.getProducts({ ...filters, category: categoryId });
    
    document.getElementById('productCount').textContent = `${products.length} Products`;
    document.getElementById('categoryProducts').innerHTML = products.map(p => createProductCard(p)).join('');
}

// Search Page
async function renderSearchPage(query) {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="section">
            <h1>Search Results for "${query}"</h1>
            
            <div class="product-grid" id="searchResults" style="margin-top: 24px;">
                <div class="skeleton-grid">
                    ${Array(12).fill('<div class="skeleton-card"></div>').join('')}
                </div>
            </div>
        </div>
    `;
    
    const products = await api.searchProducts(query);
    
    if (products.length === 0) {
        document.getElementById('searchResults').innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 16px;">🔍</div>
                <h2>No products found</h2>
                <p style="color: var(--text-secondary);">Try searching with different keywords</p>
            </div>
        `;
    } else {
        document.getElementById('searchResults').innerHTML = products.map(p => createProductCard(p)).join('');
    }
}

// Checkout Page
async function renderCheckoutPage() {
    const user = state.getState('user');
    const cart = state.getState('cart');
    const addresses = state.getState('addresses');
    
    if (!user || cart.length === 0) {
        navigateTo('cart');
        return;
    }
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="section">
            <h1>Checkout</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 400px; gap: 24px; margin-top: 24px;">
                <div>
                    <!-- Delivery Address -->
                    <div style="background: white; padding: 24px; border-radius: 4px; margin-bottom: 16px;">
                        <h3>Delivery Address</h3>
                        ${addresses.length === 0 ? `
                            <p style="margin: 16px 0;">No address found. Please add one.</p>
                            <button class="btn btn-primary" onclick="showAddressModal()">Add Address</button>
                        ` : `
                            <div style="margin-top: 16px;">
                                ${addresses.map(address => `
                                    <label class="address-card" style="cursor: pointer;">
                                        <input type="radio" name="address" value="${address.id}" ${addresses[0].id === address.id ? 'checked' : ''} style="margin-right: 12px;">
                                        <div>
                                            <div class="address-type">${address.type}</div>
                                            <div class="address-name">${address.name}</div>
                                            <div class="address-text">
                                                ${address.address}, ${address.locality}<br>
                                                ${address.city}, ${address.state} - ${address.pincode}
                                            </div>
                                        </div>
                                    </label>
                                `).join('')}
                            </div>
                        `}
                    </div>
                    
                    <!-- Order Summary -->
                    <div style="background: white; padding: 24px; border-radius: 4px;">
                        <h3>Order Summary</h3>
                        <div style="margin-top: 16px;">
                            ${cart.map(item => `
                                <div style="display: flex; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--border);">
                                    <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: contain;">
                                    <div style="flex: 1;">
                                        <div>${item.title.substring(0, 50)}...</div>
                                        <div style="color: var(--text-secondary); font-size: 14px;">Qty: ${item.quantity}</div>
                                    </div>
                                    <div style="font-weight: 500;">₹${(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Payment Summary -->
                <div>
                    <div class="price-summary">
                        <h3 style="margin-bottom: 16px;">Payment Summary</h3>
                        ${renderCheckoutPriceSummary()}
                        <button class="btn btn-primary btn-large" style="width: 100%; margin-top: 16px;" onclick="placeOrder()">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCheckoutPriceSummary() {
    const cart = state.getState('cart');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500 ? 0 : 40;
    const total = subtotal + shipping;
    
    return `
        <div class="price-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toLocaleString()}</span>
        </div>
        <div class="price-row">
            <span>Shipping</span>
            <span class="${shipping === 0 ? 'savings' : ''}">
                ${shipping === 0 ? 'FREE' : `₹${shipping}`}
            </span>
        </div>
        <div class="price-row total">
            <span>Total</span>
            <span>₹${total.toLocaleString()}</span>
        </div>
    `;
}

window.placeOrder = async function() {
    const user = state.getState('user');
    const cart = state.getState('cart');
    const addresses = state.getState('addresses');
    const selectedAddressId = document.querySelector('input[name="address"]:checked')?.value;
    
    if (!selectedAddressId) {
        showToast('Please select a delivery address', 'error');
        return;
    }
    
    const address = addresses.find(a => a.id === selectedAddressId);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500 ? 0 : 40;
    
    const order = await api.placeOrder({
        userId: user.id,
        items: cart,
        address: address,
        subtotal: subtotal,
        shipping: shipping,
        discount: 0,
        total: subtotal + shipping,
        expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
    });
    
    state.addOrder(order);
    state.clearCart();
    
    showToast('Order placed successfully!', 'success');
    navigateTo('orders');
};

// Filter handlers
window.updatePriceFilter = function(value) {
    document.getElementById('priceValue').textContent = parseInt(value).toLocaleString();
    const filters = state.getState('filters');
    state.setState({ filters: { ...filters, maxPrice: parseInt(value) } });
};

window.updateRatingFilter = function(rating) {
    const filters = state.getState('filters');
    state.setState({ filters: { ...filters, ratings: rating } });
};

window.updateSort = function(sortBy) {
    const filters = state.getState('filters');
    state.setState({ filters: { ...filters, sortBy } });
};

window.clearCategoryFilters = function() {
    state.setState({ 
        filters: {
            category: currentParams,
            search: '',
            minPrice: 0,
            maxPrice: 100000,
            brands: [],
            ratings: 0,
            sortBy: 'relevance'
        }
    });
    loadCategoryProducts(currentParams);
};

// Re-render on filter changes
state.subscribe('filters', () => {
    if (currentRoute === 'category') {
        loadCategoryProducts(currentParams);
    }
});
