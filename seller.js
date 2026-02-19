// Seller Dashboard Page

function renderSellerPage() {
    const user = state.getState('user');
    
    if (!user || user.role !== CONFIG.USER_ROLES.SELLER) {
        window.navigateTo('home');
        showToast('Access denied', 'error');
        return;
    }
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="section">
            <h1>Seller Dashboard</h1>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0;">
                <div class="stat-card">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Total Products</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">₹0</div>
                    <div class="stat-label">Total Revenue</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Orders</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">4.5⭐</div>
                    <div class="stat-label">Avg Rating</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 250px 1fr; gap: 24px;">
                <div style="background: white; padding: 16px; border-radius: 4px; height: fit-content;">
                    <div class="seller-menu">
                        <a href="#" onclick="showSellerSection('products')" class="seller-menu-item active">📦 Products</a>
                        <a href="#" onclick="showSellerSection('add-product')" class="seller-menu-item">➕ Add Product</a>
                        <a href="#" onclick="showSellerSection('orders')" class="seller-menu-item">📋 Orders</a>
                        <a href="#" onclick="showSellerSection('analytics')" class="seller-menu-item">📊 Analytics</a>
                    </div>
                </div>
                
                <div id="sellerContent">
                    ${renderProductsList()}
                </div>
            </div>
        </div>
    `;
}

function renderProductsList() {
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <h2>My Products</h2>
            
            <div style="margin-top: 24px; text-align: center; padding: 40px; color: var(--text-secondary);">
                <div style="font-size: 48px; margin-bottom: 16px;">📦</div>
                <p>No products listed yet</p>
                <button class="btn btn-primary" style="margin-top: 16px;" onclick="showSellerSection('add-product')">
                    Add Your First Product
                </button>
            </div>
        </div>
    `;
}

function renderAddProductForm() {
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <h2>Add New Product</h2>
            
            <form onsubmit="handleAddProduct(event)" style="margin-top: 24px;">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Product Title *</label>
                        <input type="text" name="title" required class="input" placeholder="Enter product title">
                    </div>
                    
                    <div class="form-group">
                        <label>Category *</label>
                        <select name="category" required class="input">
                            <option value="">Select category</option>
                            ${CONFIG.CATEGORIES.map(cat => `
                                <option value="${cat.id}">${cat.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Brand *</label>
                        <input type="text" name="brand" required class="input" placeholder="Brand name">
                    </div>
                    
                    <div class="form-group">
                        <label>Price (₹) *</label>
                        <input type="number" name="price" required class="input" min="1" placeholder="0">
                    </div>
                    
                    <div class="form-group">
                        <label>Original Price (₹) *</label>
                        <input type="number" name="originalPrice" required class="input" min="1" placeholder="0">
                    </div>
                    
                    <div class="form-group">
                        <label>Stock Quantity *</label>
                        <input type="number" name="stock" required class="input" min="0" placeholder="0">
                    </div>
                    
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label>Image URL *</label>
                        <input type="url" name="image" required class="input" placeholder="https://example.com/image.jpg">
                    </div>
                    
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label>Description *</label>
                        <textarea name="description" required class="input" rows="4" placeholder="Product description"></textarea>
                    </div>
                    
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label>Key Features (one per line)</label>
                        <textarea name="features" class="input" rows="4" placeholder="Feature 1&#10;Feature 2&#10;Feature 3"></textarea>
                    </div>
                </div>
                
                <div style="margin-top: 24px; display: flex; gap: 12px;">
                    <button type="submit" class="btn btn-primary">Add Product</button>
                    <button type="button" class="btn" onclick="showSellerSection('products')">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

window.showSellerSection = function(section) {
    document.querySelectorAll('.seller-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    if (event) event.target.classList.add('active');
    
    const content = document.getElementById('sellerContent');
    
    switch (section) {
        case 'products':
            content.innerHTML = renderProductsList();
            break;
        case 'add-product':
            content.innerHTML = renderAddProductForm();
            break;
        case 'orders':
            content.innerHTML = '<div style="background: white; padding: 24px; border-radius: 4px;"><h2>Orders</h2><p>No orders yet</p></div>';
            break;
        case 'analytics':
            content.innerHTML = '<div style="background: white; padding: 24px; border-radius: 4px;"><h2>Analytics</h2><p>Analytics coming soon</p></div>';
            break;
    }
};

window.handleAddProduct = async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const user = state.getState('user');
    
    const features = formData.get('features')
        ? formData.get('features').split('\n').filter(f => f.trim())
        : [];
    
    const product = {
        title: formData.get('title'),
        category: formData.get('category'),
        brand: formData.get('brand'),
        price: parseFloat(formData.get('price')),
        originalPrice: parseFloat(formData.get('originalPrice')),
        stock: parseInt(formData.get('stock')),
        image: formData.get('image'),
        description: formData.get('description'),
        features: features,
        seller: user.name,
        delivery: '3-5 days',
        isBestseller: false
    };
    
    try {
        await api.addProduct(product);
        showToast('Product added successfully!', 'success');
        showSellerSection('products');
    } catch (error) {
        showToast('Failed to add product', 'error');
    }
};
