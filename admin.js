// Admin Panel Page

function renderAdminPage() {
    const user = state.getState('user');
    
    if (!user || user.role !== CONFIG.USER_ROLES.ADMIN) {
        window.navigateTo('home');
        showToast('Access denied', 'error');
        return;
    }
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="section">
            <h1>Admin Panel</h1>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0;">
                <div class="stat-card">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Total Users</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">8</div>
                    <div class="stat-label">Total Products</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Total Orders</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">₹0</div>
                    <div class="stat-label">Revenue</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 250px 1fr; gap: 24px;">
                <div style="background: white; padding: 16px; border-radius: 4px; height: fit-content;">
                    <div class="admin-menu">
                        <a href="#" onclick="showAdminSection('dashboard')" class="admin-menu-item active">📊 Dashboard</a>
                        <a href="#" onclick="showAdminSection('products')" class="admin-menu-item">📦 Products</a>
                        <a href="#" onclick="showAdminSection('orders')" class="admin-menu-item">📋 Orders</a>
                        <a href="#" onclick="showAdminSection('users')" class="admin-menu-item">👥 Users</a>
                        <a href="#" onclick="showAdminSection('coupons')" class="admin-menu-item">🎫 Coupons</a>
                        <a href="#" onclick="showAdminSection('settings')" class="admin-menu-item">⚙️ Settings</a>
                    </div>
                </div>
                
                <div id="adminContent">
                    ${renderDashboard()}
                </div>
            </div>
        </div>
    `;
}

function renderDashboard() {
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <h2>Dashboard Overview</h2>
            
            <div style="margin-top: 24px;">
                <h3>Recent Activity</h3>
                <div style="margin-top: 16px; color: var(--text-secondary);">
                    No recent activity
                </div>
            </div>
        </div>
    `;
}

async function renderProductsManagement() {
    const products = await api.getProducts();
    
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <h2>Products Management</h2>
            
            <div style="margin-top: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); text-align: left;">
                            <th style="padding: 12px;">Product</th>
                            <th style="padding: 12px;">Category</th>
                            <th style="padding: 12px;">Price</th>
                            <th style="padding: 12px;">Stock</th>
                            <th style="padding: 12px;">Status</th>
                            <th style="padding: 12px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(product => `
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 12px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain;">
                                        <div>
                                            <div style="font-weight: 500;">${product.title.substring(0, 50)}...</div>
                                            <div style="font-size: 12px; color: var(--text-secondary);">${product.brand}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 12px;">${product.category}</td>
                                <td style="padding: 12px;">${formatINR(product.price)}</td>
                                <td style="padding: 12px;">${product.stock}</td>
                                <td style="padding: 12px;">
                                    <span style="padding: 4px 8px; background: ${product.stock > 0 ? '#e8f5e9' : '#ffebee'}; color: ${product.stock > 0 ? 'var(--success)' : 'var(--danger)'}; border-radius: 4px; font-size: 12px;">
                                        ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td style="padding: 12px;">
                                    <button class="btn btn-small" onclick="editProduct('${product.id}')">Edit</button>
                                    <button class="btn btn-small" onclick="deleteProduct('${product.id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderCouponsManagement() {
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Coupons Management</h2>
                <button class="btn btn-primary">+ Add Coupon</button>
            </div>
            
            <div style="display: grid; gap: 16px;">
                ${CONFIG.COUPONS.map(coupon => `
                    <div style="border: 2px dashed var(--primary); padding: 16px; border-radius: 4px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="font-size: 18px; color: var(--primary);">${coupon.code}</strong>
                                <p style="margin: 8px 0 0; color: var(--text-secondary);">
                                    ${coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
                                    ${coupon.minOrder > 0 ? ` on orders above ₹${coupon.minOrder}` : ''}
                                    ${coupon.maxDiscount ? ` (Max ₹${coupon.maxDiscount})` : ''}
                                </p>
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <button class="btn btn-small">Edit</button>
                                <button class="btn btn-small">Disable</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.showAdminSection = async function(section) {
    document.querySelectorAll('.admin-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    if (event) event.target.classList.add('active');
    
    const content = document.getElementById('adminContent');
    
    switch (section) {
        case 'dashboard':
            content.innerHTML = renderDashboard();
            break;
        case 'products':
            content.innerHTML = await renderProductsManagement();
            break;
        case 'coupons':
            content.innerHTML = renderCouponsManagement();
            break;
        default:
            content.innerHTML = `<div style="background: white; padding: 24px; border-radius: 4px;"><h2>${section}</h2><p>Coming soon...</p></div>`;
    }
};

window.editProduct = function(productId) {
    showToast('Edit product feature coming soon', 'info');
};

window.deleteProduct = async function(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    await api.deleteProduct(productId);
    showToast('Product deleted', 'success');
    showAdminSection('products');
};
