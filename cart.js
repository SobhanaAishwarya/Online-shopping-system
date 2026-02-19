// Cart Page

let appliedCoupon = null;

function renderCartPage() {
    const cart = state.getState('cart');
    const app = document.getElementById('app');
    
    if (cart.length === 0) {
        app.innerHTML = `
            <div class="section" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 16px;">🛒</div>
                <h2>Your cart is empty</h2>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Add items to get started</p>
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
            
            <h1 style="margin-top: 24px;">Shopping Cart (${cart.length} items)</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 400px; gap: 24px; margin-top: 24px;">
                <!-- Cart Items -->
                <div>
                    ${cart.map(item => renderCartItem(item)).join('')}
                </div>
                
                <!-- Price Summary -->
                <div>
                    ${renderPriceSummary()}
                </div>
            </div>
        </div>
    `;
}

function renderCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-seller">Seller: ${item.seller}</div>
                
                <div class="cart-item-price">
                    ${formatINR(item.price)}
                    <span style="text-decoration: line-through; color: var(--text-secondary); font-size: 14px; margin-left: 8px;">
                        ${formatINR(item.originalPrice)}
                    </span>
                </div>
                
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                
                <div class="cart-item-actions">
                    <span class="action-link" onclick="removeFromCart('${item.id}')">Remove</span>
                    <span class="action-link" onclick="moveToWishlist('${item.id}')">Move to Wishlist</span>
                </div>
            </div>
        </div>
    `;
}

function renderPriceSummary() {
    const cart = state.getState('cart');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = calculateShipping(subtotal);
    
    let discount = 0;
    if (appliedCoupon) {
        const result = applyCoupon(appliedCoupon, subtotal);
        if (result.success) {
            discount = result.discount;
        }
    }
    
    const total = subtotal + shipping - discount;
    
    return `
        <div class="price-summary">
            <h3 style="margin-bottom: 16px;">Price Details</h3>
            
            <div class="price-row">
                <span>Price (${cart.length} items)</span>
                <span>${formatINR(subtotal)}</span>
            </div>
            
            <div class="price-row">
                <span>Delivery Charges</span>
                <span class="${shipping === 0 ? 'savings' : ''}">
                    ${shipping === 0 ? 'FREE' : formatINR(shipping)}
                </span>
            </div>
            
            ${discount > 0 ? `
                <div class="price-row savings">
                    <span>Coupon Discount</span>
                    <span>−${formatINR(discount)}</span>
                </div>
            ` : ''}
            
            <div class="price-row total">
                <span>Total Amount</span>
                <span>${formatINR(total)}</span>
            </div>
            
            ${discount > 0 ? `
                <div class="savings" style="text-align: center; margin-top: 8px;">
                    You will save ${formatINR(discount)} on this order
                </div>
            ` : ''}
            
            <div style="margin-top: 16px;">
                <input 
                    type="text" 
                    id="couponInput" 
                    placeholder="Enter coupon code"
                    style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 2px; margin-bottom: 8px;"
                >
                <button class="btn btn-secondary" style="width: 100%;" onclick="applyCouponCode()">
                    Apply Coupon
                </button>
            </div>
            
            <button class="btn btn-primary btn-large" style="width: 100%; margin-top: 16px;" onclick="proceedToCheckout()">
                Place Order
            </button>
        </div>
    `;
}

window.updateQuantity = function(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    state.updateCartQuantity(productId, newQuantity);
    renderCartPage();
};

window.removeFromCart = function(productId) {
    state.removeFromCart(productId);
    showToast('Item removed from cart', 'info');
    renderCartPage();
};

window.moveToWishlist = async function(productId) {
    const product = await api.getProduct(productId);
    
    state.addToWishlist(product);
    state.removeFromCart(productId);
    
    showToast('Moved to wishlist', 'success');
    renderCartPage();
};

window.applyCouponCode = function() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    
    if (!code) {
        showToast('Please enter a coupon code', 'error');
        return;
    }
    
    const cart = state.getState('cart');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const result = applyCoupon(code, subtotal);
    
    if (result.success) {
        appliedCoupon = code;
        showToast(result.message, 'success');
        renderCartPage();
    } else {
        showToast(result.message, 'error');
    }
};

window.proceedToCheckout = function() {
    const user = state.getState('user');
    
    if (!user) {
        showToast('Please login to continue', 'error');
        window.showLoginModal();
        return;
    }
    
    const addresses = state.getState('addresses');
    
    if (addresses.length === 0) {
        showToast('Please add a delivery address', 'info');
        window.showAddressModal();
        return;
    }
    
    navigateTo('checkout');
};

// Subscribe to cart changes
state.subscribe('cart', renderCartPage);
