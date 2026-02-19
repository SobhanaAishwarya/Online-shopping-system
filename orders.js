// Orders Page

function renderOrdersPage() {
    const orders = state.getState('orders');
    const app = document.getElementById('app');
    
    if (orders.length === 0) {
        app.innerHTML = `
            <div class="section" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 16px;">📦</div>
                <h2>No orders yet</h2>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Start shopping to see your orders here</p>
                <button class="btn btn-primary" onclick="navigateTo('home')">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    app.innerHTML = `
        <div class="section">
            <button class="back-nav" onclick="window.history.back()">
                ← Back
            </button>
            <h1 style="margin-top: 24px;">My Orders</h1>
            
            <div style="margin-top: 24px;">
                ${orders.map(order => renderOrderCard(order)).join('')}
            </div>
        </div>
    `;
}

function renderOrderCard(order) {
    const statusInfo = CONFIG.ORDER_STATUSES[order.status] || CONFIG.ORDER_STATUSES.pending;
    
    return `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${formatDate(order.createdAt)}</div>
                </div>
                <div>
                    <span class="order-status ${order.status}">${statusInfo.label}</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 16px; padding: 16px 0;">
                ${order.items.slice(0, 3).map(item => `
                    <img 
                        src="${item.image}" 
                        alt="${item.title}" 
                        style="width: 80px; height: 80px; object-fit: contain; border: 1px solid var(--border);"
                    >
                `).join('')}
                ${order.items.length > 3 ? `
                    <div style="width: 80px; height: 80px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; background: var(--light);">
                        +${order.items.length - 3} more
                    </div>
                ` : ''}
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border);">
                <div>
                    <strong>Total: ${formatINR(order.total)}</strong>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                        ${order.items.length} item(s)
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn" onclick="viewOrderDetails('${order.id}')">View Details</button>
                    ${order.status === 'delivered' ? `
                        <button class="btn btn-secondary" onclick="reorderItems('${order.id}')">Reorder</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

window.viewOrderDetails = function(orderId) {
    const orders = state.getState('orders');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Order #${order.id}</h2>
                <button onclick="this.closest('.modal').remove()" class="close-btn">×</button>
            </div>
            <div class="modal-body">
                ${renderOrderTracking(order)}
                
                <h3 style="margin: 24px 0 12px;">Order Items</h3>
                ${order.items.map(item => `
                    <div style="display: flex; gap: 16px; padding: 12px; border: 1px solid var(--border); margin-bottom: 8px; border-radius: 4px;">
                        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: contain;">
                        <div style="flex: 1;">
                            <div>${item.title}</div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Qty: ${item.quantity}</div>
                        </div>
                        <div style="font-weight: 500;">${formatINR(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border);">
                    <h3>Delivery Address</h3>
                    <div style="margin-top: 12px;">
                        <strong>${order.address.name}</strong><br>
                        ${order.address.address}, ${order.address.locality}<br>
                        ${order.address.city}, ${order.address.state} - ${order.address.pincode}<br>
                        Phone: ${order.address.phone}
                    </div>
                </div>
                
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border);">
                    <h3>Payment Summary</h3>
                    <div style="margin-top: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Subtotal</span>
                            <span>${formatINR(order.subtotal)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Shipping</span>
                            <span>${order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}</span>
                        </div>
                        ${order.discount > 0 ? `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--success);">
                                <span>Discount</span>
                                <span>−${formatINR(order.discount)}</span>
                            </div>
                        ` : ''}
                        <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border); font-size: 18px; font-weight: 700;">
                            <span>Total</span>
                            <span>${formatINR(order.total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
};

function renderOrderTracking(order) {
    const timeline = [
        { status: 'pending', label: 'Order Placed', completed: true },
        { status: 'confirmed', label: 'Order Confirmed', completed: ['confirmed', 'packed', 'shipped', 'delivered'].includes(order.status) },
        { status: 'packed', label: 'Packed', completed: ['packed', 'shipped', 'delivered'].includes(order.status) },
        { status: 'shipped', label: 'Shipped', completed: ['shipped', 'delivered'].includes(order.status) },
        { status: 'delivered', label: 'Delivered', completed: order.status === 'delivered' }
    ];
    
    return `
        <div class="tracking-timeline">
            ${timeline.map((item, index) => `
                <div class="timeline-item ${item.completed ? 'completed' : ''}">
                    <div class="timeline-dot"></div>
                    ${index < timeline.length - 1 ? '<div class="timeline-line"></div>' : ''}
                    <div class="timeline-content">
                        <div class="timeline-status">${item.label}</div>
                        ${item.completed ? `<div class="timeline-date">${formatDate(order.createdAt)}</div>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

window.reorderItems = async function(orderId) {
    const orders = state.getState('orders');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    order.items.forEach(item => {
        state.addToCart(item, item.quantity);
    });
    
    showToast(`${order.items.length} items added to cart`, 'success');
    window.navigateTo('cart');
};

// Subscribe to orders changes
state.subscribe('orders', renderOrdersPage);
