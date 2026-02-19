// Mega Menu Component

function renderMegaMenu() {
    const menuHTML = `
        <div class="mega-menu-container">
            ${CONFIG.CATEGORIES.map(category => `
                <div class="mega-menu-item" onclick="filterByCategory('${category.id}')">
                    <span>${category.icon}</span>
                    <span>${category.name}</span>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('mega-menu').innerHTML = menuHTML;
}

window.filterByCategory = function(categoryId) {
    window.navigateTo('category', categoryId);
};
