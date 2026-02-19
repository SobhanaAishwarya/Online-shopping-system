// Main App Initialization

// Initialize app
async function initApp() {
    console.log('🚀 Initializing Flipkart Clone...');
    
    // Apply saved theme
    const theme = state.getState('theme');
    document.body.className = theme + '-theme';
    
    // Render static components
    renderHeader();
    renderMegaMenu();
    renderFooter();
    renderChatbot();
    
    // Initialize router
    initRouter();
    
    // Add CSS for additional components
    addDynamicStyles();
    
    console.log('✅ App initialized successfully!');
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 4px;
            border-left: 4px solid var(--primary);
        }
        
        .stat-value {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 4px;
        }
        
        .stat-label {
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        .seller-menu-item,
        .admin-menu-item,
        .account-menu-item {
            display: block;
            padding: 12px 16px;
            color: var(--text-primary);
            text-decoration: none;
            border-radius: 4px;
            margin-bottom: 4px;
            transition: all 0.2s;
        }
        
        .seller-menu-item:hover,
        .admin-menu-item:hover,
        .account-menu-item:hover {
            background: var(--light);
        }
        
        .seller-menu-item.active,
        .admin-menu-item.active,
        .account-menu-item.active {
            background: var(--primary);
            color: white;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 16px;
        }
        
        .category-card {
            background: white;
            padding: 24px;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px solid var(--border);
        }
        
        .category-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--primary);
        }
        
        .category-icon {
            font-size: 48px;
            margin-bottom: 12px;
        }
        
        .category-name {
            font-weight: 500;
        }
        
        .product-scroll {
            overflow: hidden;
        }
        
        .product-scroll-inner {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding-bottom: 16px;
            scrollbar-width: thin;
        }
        
        .product-scroll-inner::-webkit-scrollbar {
            height: 6px;
        }
        
        .product-scroll-inner::-webkit-scrollbar-track {
            background: var(--light);
        }
        
        .product-scroll-inner::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 3px;
        }
        
        .skeleton-grid {
            display: contents;
        }
        
        .skeleton-card {
            background: var(--light);
            border-radius: 4px;
            height: 350px;
            animation: skeleton-loading 1.5s infinite;
        }
        
        @keyframes skeleton-loading {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .user-menu {
            position: relative;
        }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid var(--border);
            border-radius: 4px;
            box-shadow: var(--shadow-lg);
            min-width: 200px;
            display: none;
            margin-top: 8px;
            z-index: 1000;
        }
        
        .dropdown-menu.active {
            display: block;
        }
        
        .dropdown-menu a {
            display: block;
            padding: 12px 16px;
            color: var(--text-primary);
            text-decoration: none;
            border-bottom: 1px solid var(--border);
        }
        
        .dropdown-menu a:last-child {
            border-bottom: none;
        }
        
        .dropdown-menu a:hover {
            background: var(--light);
        }
        
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--border);
            border-radius: 0 0 4px 4px;
            box-shadow: var(--shadow-lg);
            max-height: 400px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        }
        
        .search-suggestions.active {
            display: block;
        }
        
        .suggestion-item {
            display: flex;
            gap: 12px;
            padding: 12px;
            cursor: pointer;
            border-bottom: 1px solid var(--border);
        }
        
        .suggestion-item:hover {
            background: var(--light);
        }
        
        .suggestion-item img {
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
        
        .suggestion-title {
            font-size: 14px;
            margin-bottom: 4px;
        }
        
        .suggestion-price {
            font-size: 12px;
            font-weight: 500;
            color: var(--primary);
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 32px;
            cursor: pointer;
            color: var(--text-secondary);
            line-height: 1;
        }
        
        .close-btn:hover {
            color: var(--text-primary);
        }
    `;
    
    document.head.appendChild(style);
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
