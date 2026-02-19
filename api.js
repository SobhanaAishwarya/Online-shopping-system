// Mock API Layer

// Sample Products Data
const SAMPLE_PRODUCTS = [
    {
        id: '1',
        title: 'Realme GT 6 5G (12GB RAM, 256GB) - Fluid Silver',
        category: 'electronics',
        brand: 'Realme',
        price: 36999,
        originalPrice: 39999,
        rating: 4.4,
        reviews: 2147,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
        stock: 35,
        seller: 'Realme Official Store',
        description: 'Powerful Snapdragon processor with high-refresh AMOLED display and fast charging.',
        features: ['Snapdragon Processor', '120Hz AMOLED', '5000mAh Battery', 'Fast Charging'],
        delivery: 'Tomorrow',
         isBestseller: true
    },

    {
        id: '2',
        title: 'Samsung Galaxy S24 Ultra 5G (512GB) - Titanium Gray',
        category: 'electronics',
        brand: 'Samsung',
        price: 139999,
        originalPrice: 154999,
        rating: 4.5,
        reviews: 1823,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
        stock: 18,
        seller: 'Samsung Official Store',
        description: 'Premium flagship with S Pen, 200MP camera, and AI features',
        features: ['S Pen Included', '200MP Camera', 'AI Processing', '5000mAh Battery'],
        delivery: 'Tomorrow',
        isBestseller: true
    },
    {
        id: '3',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        category: 'electronics',
        brand: 'Sony',
        price: 29990,
        originalPrice: 34990,
        rating: 4.7,
        reviews: 3421,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop',
        stock: 42,
        seller: 'Sony India',
        description: 'Industry-leading noise cancellation with exceptional sound quality',
        features: ['30hr Battery', 'Premium Sound', 'Touch Controls', 'Multipoint Connection'],
        delivery: 'Today',
        isBestseller: true
    },
    {
        id: '4',
        title: "Levi's Men's Regular Fit Jeans - Dark Blue",
        category: 'fashion',
        brand: "Levi's",
        price: 2499,
        originalPrice: 3999,
        rating: 4.3,
        reviews: 5621,
        image: 'https://images.unsplash.com/photo-1542272454315-7bfbf30d3e89?w=500&h=500&fit=crop',
        stock: 156,
        seller: "Levi's Official",
        description: 'Classic regular fit jeans with comfort stretch',
        features: ['100% Cotton', 'Regular Fit', 'Comfort Stretch', 'Multiple Sizes'],
        delivery: '3 days',
        isBestseller: false
    },
    {
        id: '5',
        title: 'Nike Air Max 270 Running Shoes - Black/White',
        category: 'sports',
        brand: 'Nike',
        price: 12995,
        originalPrice: 15995,
        rating: 4.4,
        reviews: 2134,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        stock: 67,
        seller: 'Nike Store',
        description: 'Iconic Air Max cushioning for all-day comfort',
        features: ['Air Max Technology', 'Mesh Upper', 'Cushioned Sole', 'Lightweight'],
        delivery: 'Tomorrow',
        isBestseller: true
    },
    {
        id: '6',
        title: 'Philips Air Fryer HD9252/90 - 4.1 Liter',
        category: 'home',
        brand: 'Philips',
        price: 9999,
        originalPrice: 14995,
        rating: 4.6,
        reviews: 8234,
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop',
        stock: 34,
        seller: 'Philips Store',
        description: 'Healthy cooking with Rapid Air Technology',
        features: ['4.1L Capacity', 'Digital Display', '7 Presets', 'Dishwasher Safe'],
        delivery: 'Tomorrow',
        isBestseller: true
    },
    {
        id: '7',
        title: 'Maybelline New York Fit Me Matte+Poreless Foundation',
        category: 'beauty',
        brand: 'Maybelline',
        price: 399,
        originalPrice: 575,
        rating: 4.2,
        reviews: 12456,
        image: 'https://images.unsplash.com/photo-1631214524220-6b8d3a5f079d?w=500&h=500&fit=crop',
        stock: 234,
        seller: 'Maybelline Official',
        description: 'Lightweight foundation with matte finish',
        features: ['Matte Finish', 'Pore Minimizing', 'Long Lasting', 'Multiple Shades'],
        delivery: 'Today',
        isBestseller: false
    },
    {
        id: '8',
        title: 'LEGO Creator Expert Assembly Square 10255',
        category: 'toys',
        brand: 'LEGO',
        price: 19999,
        originalPrice: 24999,
        
        rating: 4.8,
        reviews: 892,
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=500&fit=crop',
        stock: 12,
        seller: 'LEGO Official',
        description: 'Detailed modular building set for advanced builders',
        features: ['4002 Pieces', 'Modular Building', 'Detailed Interior', 'Display Stand'],
        delivery: '5 days',
        isBestseller: false
    },
    {
        id: '9',
        title: 'MacBook Pro 16" M3 Max - Space Black',
        category: 'electronics',
        brand: 'Apple',
        price: 349900,
        originalPrice: 369900,
        rating: 4.9,
        reviews: 1247,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
        stock: 8,
        seller: 'Apple Store Official',
        description: 'Pro-level performance with M3 Max chip',
        features: ['M3 Max Chip', '16-inch Display', '64GB RAM', '1TB SSD'],
        delivery: 'Tomorrow',
        isBestseller: true
    },
    {
        id: '10',
        title: 'Canon EOS R6 Mark II Mirrorless Camera',
        category: 'electronics',
        brand: 'Canon',
        price: 239990,
        originalPrice: 259990,
        rating: 4.7,
        reviews: 623,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
        stock: 15,
        seller: 'Canon India',
        description: 'Professional mirrorless camera with 24.2MP sensor',
        features: ['24.2MP Sensor', '4K 60fps Video', 'In-Body Stabilization', 'Dual Card Slots'],
        delivery: '2 days',
        isBestseller: true
    },
    {
        id: '11',
        title: 'Adidas Ultraboost 23 Running Shoes',
        category: 'sports',
        brand: 'Adidas',
        price: 16999,
        originalPrice: 19999,
        rating: 4.5,
        reviews: 3456,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
        stock: 45,
        seller: 'Adidas Official',
        description: 'Maximum energy return with Boost technology',
        features: ['Boost Cushioning', 'Primeknit Upper', 'Continental Rubber', 'Responsive Ride'],
        delivery: 'Tomorrow',
        isBestseller: true
    },
    {
        id: '12',
        title: 'Wooden Study Table with Drawer - Modern Design',
        category: 'home',
        brand: 'HomeTown',
        price: 8999,
        originalPrice: 12999,
        rating: 4.3,
        reviews: 892,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&h=500&fit=crop',
        stock: 28,
        seller: 'HomeTown Furniture',
        description: 'Spacious study table with ample storage',
        features: ['Solid Wood', 'Drawer Storage', 'Modern Design', 'Easy Assembly'],
        delivery: '5 days',
        isBestseller: false
    },
    {
        id: '13',
        title: 'Fossil Gen 6 Smartwatch - Stainless Steel',
        category: 'electronics',
        brand: 'Fossil',
        price: 24995,
        originalPrice: 29995,
        rating: 4.4,
        reviews: 1834,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        stock: 32,
        seller: 'Fossil Store',
        description: 'Wear OS smartwatch with premium design',
        features: ['Wear OS', 'Heart Rate Monitor', 'GPS', '24hr Battery'],
        delivery: 'Tomorrow',
        isBestseller: true
    },
    {
        id: '14',
        title: 'Premium Cotton Bed Sheet Set - King Size',
        category: 'home',
        brand: 'Spaces',
        price: 3499,
        originalPrice: 5999,
        rating: 4.2,
        reviews: 2341,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop',
        stock: 67,
        seller: 'Spaces Home',
        description: '300 thread count premium cotton bed sheets',
        features: ['300 TC Cotton', 'King Size', 'Fade Resistant', 'Machine Washable'],
        delivery: '3 days',
        isBestseller: false
    },
    {
        id: '15',
        title: 'Puma Sports Gym Bag - 40L Capacity',
        category: 'sports',
        brand: 'Puma',
        price: 1999,
        originalPrice: 2999,
        rating: 4.3,
        reviews: 1567,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        stock: 89,
        seller: 'Puma Official',
        description: 'Spacious gym bag with multiple compartments',
        features: ['40L Capacity', 'Water Resistant', 'Shoe Compartment', 'Adjustable Strap'],
        delivery: 'Tomorrow',
        isBestseller: false
    },
    {
        id: '101',
        title: 'Atomic Habits by James Clear',
        category: 'books',
         brand: 'Avery Publishing',
         price: 499,
         originalPrice: 699,
         rating: 4.7,
         reviews: 12540,
         image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
         stock: 120,
         seller: 'BookWorld',
         description: 'An easy & proven way to build good habits and break bad ones.',
          features: ['Paperback', '320 Pages', 'Self-Help', 'Bestseller'],
          delivery: 'Tomorrow',
          isBestseller: true
    },
    {
         id: '102',
         title: 'The Psychology of Money',
         category: 'books',
         brand: 'Jaico Publishing',
         price: 399,
         originalPrice: 599,
         rating: 4.6,
         reviews: 8420,
         image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
         stock: 95,
         seller: 'ReadersHub',
         description: 'Timeless lessons on wealth, greed, and happiness.',
         features: ['Paperback', '256 Pages', 'Finance', 'Top Rated'],
         delivery: '2 Days',
         isBestseller: false
    },
    {
        id: '201',
        title: 'India Gate Basmati Rice 5kg',
        category: 'grocery',
        brand: 'India Gate',
        price: 699,
        originalPrice: 899,
        rating: 4.3,
        reviews: 2150,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
        stock: 200,
        seller: 'GroceryMart',
        description: 'Premium long-grain basmati rice perfect for daily meals.',
        features: ['5kg Pack', 'Premium Quality', 'Long Grain', 'Aged Rice'],
        delivery: 'Tomorrow',
            isBestseller: true
    },
    {
        id: '202',
        title: 'Fortune Sunflower Oil 1L',
        category: 'grocery',
        brand: 'Fortune',
        price: 149,
        originalPrice: 180,
        rating: 4.4,
        reviews: 3980,
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=500&fit=crop',
        stock: 340,
        seller: 'DailyNeeds',
        description: 'Refined sunflower oil ideal for healthy everyday cooking.',
        features: ['1L Bottle', 'Heart Healthy', 'Cholesterol Free', 'Light & Healthy'],
        delivery: 'Tomorrow',
        isBestseller: false
    },
    {
        id: '16',
        title: 'Lakme Absolute Matte Lipstick Collection',
        category: 'beauty',
        brand: 'Lakme',
        price: 799,
        originalPrice: 1200,
        rating: 4.4,
        reviews: 8923,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop',
        stock: 145,
        seller: 'Lakme Official',
        description: 'Long-lasting matte finish lipstick',
        features: ['Matte Finish', 'Long Lasting', 'Rich Pigment', 'Multiple Shades'],
        delivery: 'Today',
        isBestseller: true
    }
];

// API Class
class API {
    constructor() {
        this.products = this.loadProducts();
        this.initializeData();
    }

    initializeData() {
        // If nothing exists → load all products
    if (this.products.length === 0) {
        this.products = [...SAMPLE_PRODUCTS];
        this.saveProducts();
        return;
    }

    // If products already exist → add only missing ones
    const existingIds = new Set(this.products.map(p => p.id));

    SAMPLE_PRODUCTS.forEach(sample => {
        if (!existingIds.has(sample.id)) {
            this.products.push(sample);
        }
    });

    this.saveProducts();
    }

    loadProducts() {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : [];
    }

    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Products API
    async getProducts(filters = {}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filtered = [...this.products];

                // Category filter
                if (filters.category) {
                    filtered = filtered.filter(p => p.category === filters.category);
                }

                // Search filter
                if (filters.search) {
                    const query = filters.search.toLowerCase();
                    filtered = filtered.filter(p =>
                        p.title.toLowerCase().includes(query) ||
                        p.brand.toLowerCase().includes(query) ||
                        p.description.toLowerCase().includes(query)
                    );
                }

                // Price filter
                if (filters.minPrice !== undefined) {
                    filtered = filtered.filter(p => p.price >= filters.minPrice);
                }
                if (filters.maxPrice !== undefined) {
                    filtered = filtered.filter(p => p.price <= filters.maxPrice);
                }

                // Brand filter
                if (filters.brands && filters.brands.length > 0) {
                    filtered = filtered.filter(p => filters.brands.includes(p.brand));
                }

                // Rating filter
                if (filters.ratings) {
                    filtered = filtered.filter(p => p.rating >= filters.ratings);
                }

                // Sorting
                switch (filters.sortBy) {
                    case 'price-low':
                        filtered.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high':
                        filtered.sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        filtered.sort((a, b) => b.rating - a.rating);
                        break;
                    case 'popular':
                        filtered.sort((a, b) => b.reviews - a.reviews);
                        break;
                }

                resolve(filtered);
            }, 100);
        });
    }

    async getProduct(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id === id);
                resolve(product);
            }, 50);
        });
    }

    async searchProducts(query) {
        return this.getProducts({ search: query });
    }

    async getFeaturedProducts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const featured = this.products.filter(p => p.isBestseller).slice(0, 8);
                resolve(featured);
            }, 100);
        });
    }

    async getRelatedProducts(productId, limit = 4) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id === productId);
                if (!product) {
                    resolve([]);
                    return;
                }
                
                const related = this.products
                    .filter(p => p.category === product.category && p.id !== productId)
                    .slice(0, limit);
                resolve(related);
            }, 100);
        });
    }

    // User API
    async login(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock authentication
                resolve({
                    id: generateId(),
                    name: 'Demo User',
                    email: email,
                    role: CONFIG.USER_ROLES.CUSTOMER,
                    phone: '9876543210',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Demo User')}`
                });
            }, 500);
        });
    }

    async register(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: generateId(),
                    ...userData,
                    role: CONFIG.USER_ROLES.CUSTOMER,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`
                });
            }, 500);
        });
    }

    // Orders API
    async placeOrder(orderData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const order = {
                    id: generateId(),
                    ...orderData,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                };
                resolve(order);
            }, 300);
        });
    }

    async getOrders(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Return from localStorage
                const orders = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.ORDERS) || '[]');
                resolve(orders);
            }, 200);
        });
    }

    // Reviews API
    async addReview(productId, review) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newReview = {
                    id: generateId(),
                    productId,
                    ...review,
                    createdAt: new Date().toISOString()
                };
                resolve(newReview);
            }, 300);
        });
    }

    // Seller API
    async addProduct(productData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = {
                    id: generateId(),
                    ...productData,
                    rating: 0,
                    reviews: 0,
                    createdAt: new Date().toISOString()
                };
                this.products.push(product);
                this.saveProducts();
                resolve(product);
            }, 300);
        });
    }

    async updateProduct(productId, updates) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = this.products.findIndex(p => p.id === productId);
                if (index > -1) {
                    this.products[index] = { ...this.products[index], ...updates };
                    this.saveProducts();
                    resolve(this.products[index]);
                } else {
                    resolve(null);
                }
            }, 300);
        });
    }

    async deleteProduct(productId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.products = this.products.filter(p => p.id !== productId);
                this.saveProducts();
                resolve(true);
            }, 200);
        });
    }
}

const api = new API();
