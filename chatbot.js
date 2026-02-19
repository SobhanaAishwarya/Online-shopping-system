// Chatbot Component

let chatActive = false;
const chatHistory = [];

function renderChatbot() {
    const chatHTML = `
        <button class="chat-button" onclick="toggleChat()">💬</button>
        <div class="chat-panel" id="chatPanel">
            <div class="chat-header">
                <div>
                    <strong>Shopping Assistant</strong>
                    <div style="font-size: 11px; opacity: 0.8;">Online</div>
                </div>
                <button onclick="toggleChat()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message">
                    <div class="message-bubble">
                        Hi! 👋 I'm your shopping assistant. How can I help you today?
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <input 
                    type="text" 
                    class="chat-input" 
                    id="chatInput" 
                    placeholder="Type a message..."
                    onkeypress="if(event.key==='Enter') sendMessage()"
                >
                <button class="chat-send" onclick="sendMessage()">Send</button>
            </div>
        </div>
    `;

    document.getElementById('chat-widget').innerHTML = chatHTML;
}

window.toggleChat = function() {
    chatActive = !chatActive;
    const panel = document.getElementById('chatPanel');
    panel.classList.toggle('active');
    
    if (chatActive) {
        document.getElementById('chatInput').focus();
    }
};

window.sendMessage = async function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Get AI response
    const response = await getAIResponse(message);
    
    setTimeout(() => {
        addChatMessage(response, 'bot');
    }, 500);
};

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    chatHistory.push({ text, sender, timestamp: new Date() });
}

async function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Track order
    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
        const orders = state.getState('orders');
        if (orders.length === 0) {
            return "You don't have any orders yet. Would you like to browse our products?";
        }
        const latestOrder = orders[0];
        return `Your latest order #${latestOrder.id} is ${latestOrder.status}. Expected delivery: ${latestOrder.expectedDelivery}`;
    }
    
    // Product recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
        const featured = await api.getFeaturedProducts();
        if (featured.length > 0) {
            const product = featured[0];
            return `I recommend checking out ${product.title} at ₹${product.price.toLocaleString()}. It has ${product.rating}⭐ rating!`;
        }
    }
    
    // Cart info
    if (lowerMessage.includes('cart')) {
        const cartCount = state.getCartCount();
        if (cartCount === 0) {
            return "Your cart is empty. Let me help you find something!";
        }
        return `You have ${cartCount} item(s) in your cart worth ₹${state.getCartTotal().toLocaleString()}`;
    }
    
    // Search products
    if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('looking for')) {
        const keywords = message.split(' ').filter(w => w.length > 3);
        if (keywords.length > 0) {
            const products = await api.searchProducts(keywords[0]);
            if (products.length > 0) {
                return `I found ${products.length} products related to "${keywords[0]}". Would you like me to show them?`;
            }
        }
    }
    
    // Coupons
    if (lowerMessage.includes('coupon') || lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
        return `We have these active coupons:\n• WELCOME10 - 10% off\n• SAVE20 - 20% off on orders above ₹1000\n• MEGA50 - 50% off on orders above ₹2000`;
    }
    
    // Return policy
    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
        return "We offer easy 7-day return and replacement policy for most products. You can initiate a return from your orders page.";
    }
    
    // Delivery
    if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
        return "We offer free delivery on orders above ₹500. Express delivery available for ₹50 extra!";
    }
    
    // Default responses
    const responses = [
        "I'm here to help! You can ask me about orders, products, coupons, or anything else.",
        "How can I assist you with your shopping today?",
        "I can help you find products, track orders, or answer questions. What would you like to know?",
        "Looking for something specific? I can help you find it!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}
