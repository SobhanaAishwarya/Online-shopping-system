// Header Component

function renderHeader() {
    const user = state.getState('user');
    const cartCount = state.getCartCount();
    const wishlistCount = state.getState('wishlist').length;

    const headerHTML = `
        <div class="header-container">
            <div class="logo" onclick="navigateTo('home')">
                ELY CART
            </div>
            
            <div class="search-container">
                <input 
                    type="text" 
                    class="search-input" 
                    id="searchInput"
                    placeholder="Search for products, brands and more..."
                >
                <button class="search-btn" onclick="performSearch()">
                    🔍
                </button>
                <div class="search-suggestions" id="searchSuggestions"></div>
            </div>
            
            <div class="header-actions">
                <button class="header-btn" onclick="navigateTo('home')">
                    <span>Home</span>
                </button>
                
                ${user ? `
                    <div class="user-menu">
                        <button class="header-btn" onclick="toggleUserMenu()">
                            👤 <span>${escapeHtml(user.name.split(' ')[0])}</span>
                        </button>
                        <div class="dropdown-menu" id="userDropdown">
                            <a href="#" onclick="event.preventDefault(); navigateTo('account')">👤 My Profile</a>
                            <a href="#" onclick="event.preventDefault(); navigateTo('orders')">📦 Orders</a>
                            <a href="#" onclick="event.preventDefault(); navigateTo('wishlist')">❤️ Wishlist</a>
                            ${user.role === 'seller' ? '<a href="#" onclick="event.preventDefault(); navigateTo(\'seller\')">🏪 Seller Dashboard</a>' : ''}
                            ${user.role === 'admin' ? '<a href="#" onclick="event.preventDefault(); navigateTo(\'admin\')">⚙️ Admin Panel</a>' : ''}
                            <a href="#" onclick="event.preventDefault(); handleLogout()">🚪 Logout</a>
                        </div>
                    </div>
                ` : `
                    <button class="header-btn btn-primary" onclick="showLoginModal()">Login</button>
                `}
                
                <button class="header-btn" onclick="navigateTo('wishlist')">
                    ❤️ <span>Wishlist</span>
                    ${wishlistCount > 0 ? `<span class="badge">${wishlistCount}</span>` : ''}
                </button>
                
                <button class="header-btn" onclick="navigateTo('cart')">
                    🛒 <span>Cart</span>
                    ${cartCount > 0 ? `<span class="badge">${cartCount}</span>` : ''}
                </button>
                
                <button class="header-btn" onclick="toggleTheme()" title="Toggle Theme">
                    ${state.getState('theme') === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </div>
    `;

    document.getElementById('header').innerHTML = headerHTML;
    setupSearchListener();
}

function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            showSearchSuggestions(e.target.value);
        }, 300);
    });

    searchInput.addEventListener('focus', (e) => {
        if (e.target.value) {
            showSearchSuggestions(e.target.value);
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('searchSuggestions').classList.remove('active');
        }
    });
}

async function showSearchSuggestions(query) {
    const suggestionsEl = document.getElementById('searchSuggestions');
    
    if (!query || query.length < 2) {
        suggestionsEl.classList.remove('active');
        return;
    }

    const products = await api.searchProducts(query);
    const suggestions = products.slice(0, 5);

    if (suggestions.length === 0) {
        suggestionsEl.classList.remove('active');
        return;
    }

    suggestionsEl.innerHTML = suggestions.map(product => `
        <div class="suggestion-item" onclick="navigateTo('product', '${product.id}')">
            <img src="${product.image}" alt="${escapeHtml(product.title)}">
            <div>
                <div class="suggestion-title">${escapeHtml(product.title)}</div>
                <div class="suggestion-price">₹${product.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');

    suggestionsEl.classList.add('active');
}

// Global functions
window.performSearch = async function() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        window.navigateTo('search', query);
    }
};

window.toggleUserMenu = function() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
};

window.handleLogout = function() {
    if (confirm('Are you sure you want to logout?')) {
        state.logout();
        window.navigateTo('home');
    }
};

window.toggleTheme = function() {
    const currentTheme = state.getState('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    state.setState({ theme: newTheme });
    document.body.className = newTheme + '-theme';
};

// Subscribe to state changes
state.subscribe('user', renderHeader);
state.subscribe('cart', renderHeader);
state.subscribe('wishlist', renderHeader);
state.subscribe('theme', renderHeader);
