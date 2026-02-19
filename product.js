// Product Page

async function renderProductPage(productId) {
    const product = await api.getProduct(productId);
    
    if (!product) {
        document.getElementById('app').innerHTML = '<div class="section"><h2>Product not found</h2></div>';
        return;
    }
    
    // Add to recently viewed
    state.addToRecentlyViewed(product);
    
    const app = document.getElementById('app');
    const discount = calculateDiscount(product.originalPrice, product.price);
    const isInWishlist = state.isInWishlist(product.id);
    
    app.innerHTML = `
        <div class="section">
            <button class="back-nav" onclick="window.history.back()">
                ← Back
            </button>
            
            <div style="display: grid; grid-template-columns: 400px 1fr; gap: 32px; margin-top: 24px;">
                <!-- Product Images -->
                <div>
                    <div class="product-image-main" style="border: 1px solid var(--border); padding: 24px; text-align: center;">
                        <img 
                            src="${product.image}" 
                            alt="${escapeHtml(product.title)}" 
                            style="width: 100%; max-height: 500px; object-fit: contain; cursor: zoom-in;"
                            onclick="showImageZoom('${product.image}')"
                        >
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 16px;">
                        <button class="btn btn-primary btn-large" style="flex: 1;" onclick="addToCartProduct('${product.id}')">
                            🛒 Add to Cart
                        </button>
                        <button class="btn btn-secondary btn-large" onclick="toggleWishlistProduct('${product.id}')">
                            ${isInWishlist ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
                
                <!-- Product Details -->
                <div>
                    <h1 style="font-size: 24px; margin-bottom: 8px;">${escapeHtml(product.title)}</h1>
                    
                    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                        <div class="product-rating">${product.rating} ⭐</div>
                        <span style="color: var(--text-secondary);">${product.reviews.toLocaleString()} ratings & reviews</span>
                    </div>
                    
                    <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px;">
                        <span style="font-size: 28px; font-weight: 500;">${formatINR(product.price)}</span>
                        <span style="font-size: 16px; color: var(--text-secondary); text-decoration: line-through;">${formatINR(product.originalPrice)}</span>
                        <span style="font-size: 16px; color: var(--success); font-weight: 500;">${discount}% off</span>
                    </div>
                    
                    <div style="background: var(--light); padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                        <strong>Available Offers</strong>
                        <ul style="margin: 8px 0 0 20px;">
                            <li>Get extra 10% off (price inclusive of discount)</li>
                            <li>Flat ₹100 off on orders above ₹1000</li>
                            <li>No Cost EMI available on orders above ₹3000</li>
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <strong>Delivery</strong>
                        <p style="margin: 8px 0;">Free delivery by <strong>${product.delivery}</strong></p>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <strong>Seller</strong>
                        <p style="margin: 8px 0;">${escapeHtml(product.seller)}</p>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <strong>Description</strong>
                        <p style="margin: 8px 0; line-height: 1.6;">${escapeHtml(product.description)}</p>
                    </div>
                    
                    ${product.features ? `
                        <div style="margin-bottom: 24px;">
                            <strong>Key Features</strong>
                            <ul style="margin: 8px 0 0 20px; line-height: 1.8;">
                                ${product.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div style="margin-bottom: 24px;">
                        <strong>Share</strong>
                        <div style="display: flex; gap: 12px; margin-top: 8px;">
                            <button class="btn" onclick="shareProduct('whatsapp')">WhatsApp</button>
                            <button class="btn" onclick="shareProduct('facebook')">Facebook</button>
                            <button class="btn" onclick="shareProduct('twitter')">Twitter</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Related Products -->
            <div style="margin-top: 48px;">
                <h2 class="section-title">Related Products</h2>
                <div class="product-scroll" id="relatedProducts">
                    <div class="skeleton-grid">
                        ${Array(4).fill('<div class="skeleton-card"></div>').join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    loadRelatedProducts(product.id);
}

async function loadRelatedProducts(productId) {
    const products = await api.getRelatedProducts(productId, 6);
    const container = document.getElementById('relatedProducts');
    
    container.innerHTML = `
        <div class="product-scroll-inner">
            ${products.map(product => createProductCard(product)).join('')}
        </div>
    `;
}

window.addToCartProduct = async function(productId) {
    const product = await api.getProduct(productId);
    state.addToCart(product);
    showToast('Added to cart!', 'success');
};

window.toggleWishlistProduct = async function(productId) {
    const product = await api.getProduct(productId);
    
    if (state.isInWishlist(productId)) {
        state.removeFromWishlist(productId);
        showToast('Removed from wishlist', 'info');
    } else {
        state.addToWishlist(product);
        showToast('Added to wishlist', 'success');
    }
    
    // Re-render page
    renderProductPage(productId);
};

window.shareProduct = function(platform) {
    const product = state.getState('products').find(p => p.id === window.currentProductId);
    if (product) {
        shareOnSocial(platform, product);
    }
};

window.showImageZoom = function(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90vw; max-height: 90vh; padding: 0;">
            <img src="${imageSrc}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
    `;
    modal.onclick = () => modal.remove();
    document.body.appendChild(modal);
};
