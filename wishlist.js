// Wishlist Page

function renderWishlistPage() {
    const wishlist = state.getState('wishlist');
    const app = document.getElementById('app');
    
    if (wishlist.length === 0) {
        app.innerHTML = `
            <div class="section" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 16px;">❤️</div>
                <h2>Your wishlist is empty</h2>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Save items that you like to your wishlist</p>
                <button class="btn btn-primary" onclick="navigateTo('home')">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    app.innerHTML = `
        <div class="section">
            <button class="back-nav" onclick="window.history.back()">
                ← Back
            </button>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 24px 0;">
                <h1>My Wishlist (${wishlist.length} items)</h1>
                <button class="btn" onclick="addAllToCart()">Add All to Cart</button>
            </div>
            
            <div class="product-grid">
                ${wishlist.map(product => createProductCard(product)).join('')}
            </div>
        </div>
    `;
}

window.addAllToCart = async function() {
    const wishlist = state.getState('wishlist');
    
    wishlist.forEach(product => {
        state.addToCart(product);
    });
    
    state.setState({ wishlist: [] });
    showToast(`${wishlist.length} items added to cart`, 'success');
    renderWishlistPage();
};

// Subscribe to wishlist changes
state.subscribe('wishlist', renderWishlistPage);
