// Modal Components

// Login Modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex';
}

window.showLoginModal = showLoginModal;

window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
};

window.switchToSignup = function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
};

window.switchToLogin = function() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
};

window.handleLogin = async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    try {
        const user = await api.login(email, password);
        state.setUser(user);
        showToast(`Welcome back, ${user.name}!`, 'success');
        closeModal('loginModal');
    } catch (error) {
        showToast('Login failed. Please try again.', 'error');
    }
};

window.handleSignup = async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!name || name.length < 3) {
        showToast('Please enter a valid name', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        const user = await api.register({ name, email, phone, password });
        state.setUser(user);
        showToast(`Welcome, ${user.name}!`, 'success');
        closeModal('loginModal');
    } catch (error) {
        showToast('Signup failed. Please try again.', 'error');
    }
};

// Address Modal
window.showAddressModal = function(address = null) {
    const modal = document.getElementById('addressModal');
    const form = document.getElementById('addressForm');
    
    if (address) {
        document.getElementById('addressId').value = address.id || '';
        document.getElementById('addressName').value = address.name || '';
        document.getElementById('addressPhone').value = address.phone || '';
        document.getElementById('addressPincode').value = address.pincode || '';
        document.getElementById('addressLocality').value = address.locality || '';
        document.getElementById('addressAddress').value = address.address || '';
        document.getElementById('addressCity').value = address.city || '';
        document.getElementById('addressState').value = address.state || '';
        document.getElementById('addressType').value = address.type || 'home';
    } else {
        form.reset();
        document.getElementById('addressId').value = '';
    }
    
    modal.style.display = 'flex';
};

window.handleAddressSave = function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const address = {
        id: formData.get('id') || Date.now().toString(),
        name: formData.get('name'),
        phone: formData.get('phone'),
        pincode: formData.get('pincode'),
        locality: formData.get('locality'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        type: formData.get('type')
    };
    
    if (!isValidPhone(address.phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!isValidPincode(address.pincode)) {
        showToast('Please enter a valid PIN code', 'error');
        return;
    }
    
    let addresses = state.getState('addresses');
    const existingIndex = addresses.findIndex(a => a.id === address.id);
    
    if (existingIndex > -1) {
        addresses[existingIndex] = address;
        showToast('Address updated successfully', 'success');
    } else {
        addresses.push(address);
        showToast('Address added successfully', 'success');
    }
    
    state.setState({ addresses });
    closeModal('addressModal');
};

// Filter Modal
window.showFilterModal = function() {
    const modal = document.getElementById('filterModal');
    modal.style.display = 'flex';
};

window.applyFilters = function() {
    const filters = {
        minPrice: parseInt(document.getElementById('filterMinPrice').value) || 0,
        maxPrice: parseInt(document.getElementById('filterMaxPrice').value) || 100000,
        ratings: parseInt(document.querySelector('input[name="rating"]:checked')?.value || 0),
        brands: Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value)
    };
    
    state.setState({ filters });
    closeModal('filterModal');
    showToast('Filters applied', 'success');
};

window.clearFilters = function() {
    state.setState({ 
        filters: {
            category: '',
            search: '',
            minPrice: 0,
            maxPrice: 100000,
            brands: [],
            ratings: 0,
            sortBy: 'relevance'
        }
    });
    closeModal('filterModal');
    showToast('Filters cleared', 'success');
};

// Product Quick View Modal
window.showProductQuickView = async function(productId) {
    const product = await api.getProduct(productId);
    if (!product) return;
    
    const modal = document.getElementById('productQuickView');
    const content = modal.querySelector('.modal-body');
    
    content.innerHTML = `
        <div style="display: flex; gap: 24px;">
            <img src="${product.image}" alt="${product.title}" style="width: 300px; height: 300px; object-fit: contain;">
            <div style="flex: 1;">
                <h2>${product.title}</h2>
                <div class="product-rating">${product.rating} ⭐ (${product.reviews.toLocaleString()} reviews)</div>
                <div class="product-price" style="margin: 16px 0;">
                    <span class="current-price">₹${product.price.toLocaleString()}</span>
                    <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                </div>
                <p>${product.description}</p>
                <div style="margin-top: 24px; display: flex; gap: 12px;">
                    <button class="btn btn-primary" onclick="addToCartQuick('${product.id}')">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="navigateTo('product', '${product.id}'); closeModal('productQuickView')">View Details</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
};

window.addToCartQuick = async function(productId) {
    const product = await api.getProduct(productId);
    state.addToCart(product);
    showToast('Added to cart', 'success');
    closeModal('productQuickView');
};

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
