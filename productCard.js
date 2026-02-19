// Product Card Component

function createProductCard(product) {
    const isInWishlist = state.isInWishlist(product.id);
    const discount = calculateDiscount(product.originalPrice, product.price);

    return `
        <div class="product-card" onclick="navigateTo('product', '${product.id}')">
            <div class="product-image-container">
                <img 
                    src="${product.image}" 
                    alt="${escapeHtml(product.title)}" 
                    class="product-image"
                    loading="lazy"
                >
                <button 
                    class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    onclick="event.stopPropagation(); toggleWishlist('${product.id}')"
                >
                    ${isInWishlist ? '❤️' : '🤍'}
                </button>
                ${product.isBestseller ? '<span class="product-badge">Bestseller</span>' : ''}
            </div>
            
            <div class="product-title">${escapeHtml(product.title)}</div>
            
            <div class="product-rating">
                ${product.rating} ⭐
                <span style="opacity: 0.7;">(${product.reviews.toLocaleString()})</span>
            </div>
            
            <div class="product-price">
                <span class="current-price">${formatINR(product.price)}</span>
                <span class="original-price">${formatINR(product.originalPrice)}</span>
                <span class="discount">${discount}% off</span>
            </div>
            
            <div class="delivery-info ${product.delivery === 'Today' || product.delivery === 'Tomorrow' ? 'free' : ''}">
                ${product.delivery === 'Today' || product.delivery === 'Tomorrow' 
                    ? `Free delivery by ${product.delivery}` 
                    : `Delivery in ${product.delivery}`
                }
            </div>
        </div>
    `;
}

window.toggleWishlist = async function(productId) {
    const product = await api.getProduct(productId);
    
    if (state.isInWishlist(productId)) {
        state.removeFromWishlist(productId);
        showToast('Removed from wishlist', 'info');
    } else {
        state.addToWishlist(product);
        showToast('Added to wishlist', 'success');
    }
};
