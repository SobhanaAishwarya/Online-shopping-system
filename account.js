// Account/Profile Page

function renderAccountPage() {
    const user = state.getState('user');
    const addresses = state.getState('addresses');
    
    if (!user) {
        window.navigateTo('home');
        window.showLoginModal();
        return;
    }
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="section">
            <button class="back-nav" onclick="window.history.back()">
                ← Back
            </button>
            
            <h1 style="margin: 24px 0;">My Account</h1>
            
            <div style="display: grid; grid-template-columns: 250px 1fr; gap: 24px; margin-top: 24px;">
                <!-- Sidebar -->
                <div style="background: white; padding: 16px; border-radius: 4px; height: fit-content;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
                        <img src="${user.avatar}" alt="${user.name}" style="width: 50px; height: 50px; border-radius: 50%;">
                        <div>
                            <strong>${user.name}</strong>
                            <div style="font-size: 12px; color: var(--text-secondary);">${user.email}</div>
                        </div>
                    </div>
                    
                    <div class="account-menu">
                        <a href="#" onclick="showAccountSection('profile')" class="account-menu-item active">👤 Profile</a>
                        <a href="#" onclick="showAccountSection('addresses')" class="account-menu-item">📍 Addresses</a>
                        <a href="#" onclick="navigateTo('orders')" class="account-menu-item">📦 Orders</a>
                        <a href="#" onclick="navigateTo('wishlist')" class="account-menu-item">❤️ Wishlist</a>
                        <a href="#" onclick="showAccountSection('settings')" class="account-menu-item">⚙️ Settings</a>
                    </div>
                </div>
                
                <!-- Content -->
                <div id="accountContent">
                    ${renderProfileSection(user)}
                </div>
            </div>
        </div>
    `;
}

function renderProfileSection(user) {
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <h2>Profile Information</h2>
            
            <form onsubmit="updateProfile(event)" style="margin-top: 24px;">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Name</label>
                    <input type="text" name="name" value="${user.name}" required class="input">
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
                    <input type="email" name="email" value="${user.email}" required class="input">
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Phone</label>
                    <input type="tel" name="phone" value="${user.phone}" required class="input">
                </div>
                
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
        </div>
    `;
}

function renderAddressesSection() {
    const addresses = state.getState('addresses');
    
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>My Addresses</h2>
                <button class="btn btn-primary" onclick="showAddressModal()">+ Add New Address</button>
            </div>
            
            ${addresses.length === 0 ? `
                <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <div style="font-size: 48px; margin-bottom: 16px;">📍</div>
                    <p>No addresses saved yet</p>
                </div>
            ` : `
                <div style="display: grid; gap: 16px;">
                    ${addresses.map(address => `
                        <div class="address-card">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div>
                                    <span class="address-type">${address.type}</span>
                                    <div class="address-name">${address.name}</div>
                                    <div class="address-phone">${address.phone}</div>
                                    <div class="address-text">
                                        ${address.address}, ${address.locality}<br>
                                        ${address.city}, ${address.state} - ${address.pincode}
                                    </div>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button class="btn btn-small" onclick='showAddressModal(${JSON.stringify(address)})'>Edit</button>
                                    <button class="btn btn-small" onclick="deleteAddress('${address.id}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

function renderSettingsSection() {
    const theme = state.getState('theme');
    
    return `
        <div style="background: white; padding: 24px; border-radius: 4px;">
            <h2>Settings</h2>
            
            <div style="margin-top: 24px;">
                <h3 style="margin-bottom: 16px;">Appearance</h3>
                <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                    <input 
                        type="checkbox" 
                        ${theme === 'dark' ? 'checked' : ''}
                        onchange="toggleTheme()"
                    >
                    <span>Dark Mode</span>
                </label>
            </div>
            
            <div style="margin-top: 32px;">
                <h3 style="margin-bottom: 16px;">Notifications</h3>
                <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 12px;">
                    <input type="checkbox" checked>
                    <span>Order updates</span>
                </label>
                <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 12px;">
                    <input type="checkbox" checked>
                    <span>Promotional emails</span>
                </label>
                <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                    <input type="checkbox" checked>
                    <span>New offers and discounts</span>
                </label>
            </div>
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border);">
                <h3 style="margin-bottom: 16px; color: var(--danger);">Danger Zone</h3>
                <button class="btn" style="background: var(--danger); color: white;" onclick="handleLogout()">
                    Logout
                </button>
            </div>
        </div>
    `;
}

window.showAccountSection = function(section) {
    // Update active menu item
    document.querySelectorAll('.account-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const content = document.getElementById('accountContent');
    const user = state.getState('user');
    
    switch (section) {
        case 'profile':
            content.innerHTML = renderProfileSection(user);
            break;
        case 'addresses':
            content.innerHTML = renderAddressesSection();
            break;
        case 'settings':
            content.innerHTML = renderSettingsSection();
            break;
    }
};

window.updateProfile = function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const user = state.getState('user');
    
    const updatedUser = {
        ...user,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
    };
    
    state.setUser(updatedUser);
    showToast('Profile updated successfully', 'success');
};

window.deleteAddress = function(addressId) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    const addresses = state.getState('addresses').filter(a => a.id !== addressId);
    state.setState({ addresses });
    showToast('Address deleted', 'info');
    showAccountSection('addresses');
};
