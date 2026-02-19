// Footer Component
function renderFooter() {
    const footerHTML = `
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>About ELY CART</h3>
                    <a href="#" class="footer-link">About Us</a>
                    <a href="#" class="footer-link">Careers</a>
                    <a href="#" class="footer-link">Press & Media</a>
                    <a href="#" class="footer-link">Partnerships</a>
                    <a href="#" class="footer-link">Corporate Information</a>
                </div>
                
                <div class="footer-section">
                    <h3>Customer Service</h3>
                    <a href="#" class="footer-link">Help Center</a>
                    <a href="#" class="footer-link">Track Order</a>
                    <a href="#" class="footer-link">Returns & Refunds</a>
                    <a href="#" class="footer-link">Shipping Information</a>
                    <a href="#" class="footer-link">FAQ</a>
                </div>
                
                <div class="footer-section">
                    <h3>Policies</h3>
                    <a href="#" class="footer-link">Privacy Policy</a>
                    <a href="#" class="footer-link">Terms of Service</a>
                    <a href="#" class="footer-link">Return Policy</a>
                    <a href="#" class="footer-link">Cookie Policy</a>
                    <a href="#" class="footer-link">Sitemap</a>
                </div>
                
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <a href="#" class="footer-link">📘 Facebook</a>
                    <a href="#" class="footer-link">🐦 Twitter</a>
                    <a href="#" class="footer-link">📸 Instagram</a>
                    <a href="#" class="footer-link">▶️ YouTube</a>
                    <a href="#" class="footer-link">💼 LinkedIn</a>
                </div>
                
                <div class="footer-section">
                    <h3>Registered Office</h3>
                    <p style="font-size: 13px; opacity: 0.9; line-height: 1.8;">
                        <strong>ELY CART Private Limited</strong><br>
                        Anil Neerakonda Institute of<br>
                        Technology & Sciences,<br>
                        Visakhapatnam,<br>
                        Andhra Pradesh, India<br><br>
                        📧 support@elycart.com<br>
                        📞 <a href="tel:+911800123456" style="color: #a855f7; text-decoration: none;">1800-123-456</a>
                    </p>
                </div>
                
                <div class="footer-section">
                    <h3>Download Our App</h3>
                    <p style="font-size: 13px; opacity: 0.9; margin-bottom: 16px;">
                        Shop on the go with our mobile app
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <a href="#" style="display: inline-block; background: rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 8px; text-align: center; text-decoration: none; color: white; font-weight: 600;">
                            📱 App Store
                        </a>
                        <a href="#" style="display: inline-block; background: rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 8px; text-align: center; text-decoration: none; color: white; font-weight: 600;">
                            🤖 Google Play
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>© ${new Date().getFullYear()} ELY CART. All Rights Reserved. | Made with ❤️ at Anil Neerakonda Institute of Technology & Sciences, Visakhapatnam</p>
            </div>
        </div>
    `;

    document.getElementById('footer').innerHTML = footerHTML;
}
