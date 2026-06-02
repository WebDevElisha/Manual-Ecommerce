// Sample Products Data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 79.99,
        image: "🎧",
        description: "High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
        details: "These premium wireless headphones feature cutting-edge noise cancellation technology, delivering crystal-clear audio whether you're in a bustling city or a quiet office. With a 30-hour battery life, you can enjoy uninterrupted listening for days. The comfortable over-ear design ensures long-wearing comfort, and the intuitive touch controls make it easy to manage your music on the go."
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        price: 129.99,
        image: "⌨️",
        description: "RGB mechanical keyboard with customizable switches and aluminum frame. Ideal for gaming and typing enthusiasts.",
        details: "Experience the ultimate typing experience with this mechanical keyboard featuring customizable RGB lighting, premium aluminum frame, and your choice of mechanical switches. Every keystroke is responsive and satisfying, making it perfect for both gaming marathons and long work sessions. The keyboard includes programmable macros and comes with a detachable USB-C cable."
    },
    {
        id: 3,
        name: "Portable Power Bank",
        price: 49.99,
        image: "🔋",
        description: "50000mAh portable charger with fast charging capability and dual USB ports. Keep your devices charged anywhere.",
        details: "Never run out of battery again with this powerful 50000mAh portable power bank. It features dual USB ports for charging two devices simultaneously, fast-charging technology to get your phone ready in minutes, and a sleek compact design that fits perfectly in your backpack. The LED indicator shows battery status at a glance."
    },
    {
        id: 4,
        name: "4K Webcam",
        price: 99.99,
        image: "📹",
        description: "Ultra HD 4K webcam with auto-focus and built-in microphone. Perfect for streaming and video conferencing.",
        details: "Stream and video conference in stunning 4K resolution with this professional-grade webcam. The advanced auto-focus ensures you're always crystal clear, while the built-in stereo microphone captures clean audio. Works seamlessly with all major video platforms and includes a universal mounting bracket."
    },
    {
        id: 5,
        name: "Smart Watch",
        price: 199.99,
        image: "⌚",
        description: "Feature-rich smartwatch with fitness tracking, heart rate monitor, and 7-day battery life.",
        details: "Stay connected and active with this comprehensive smartwatch. Track your workouts, monitor your heart rate, receive notifications, and stay organized with built-in apps. The 7-day battery life means fewer charging sessions, and the vibrant AMOLED display is perfect for any condition. Water-resistant up to 50 meters."
    },
    {
        id: 6,
        name: "Compact Laptop Stand",
        price: 39.99,
        image: "💻",
        description: "Adjustable aluminum laptop stand with ergonomic design. Compatible with all laptop sizes.",
        details: "Elevate your workspace with this sleek aluminum laptop stand. Adjustable to multiple angles for optimal ergonomics, it fits laptops up to 17 inches and provides excellent ventilation. The lightweight yet sturdy construction makes it perfect for both office and travel, and it folds flat for easy portability."
    }
];

// Admin messages storage
let adminMessages = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    generateFallingStars();
});

// Load products to the dashboard
function loadProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-description">${product.description}</div>
                <button class="view-btn" onclick="openProductModal(${product.id})">View Details</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Open product modal with details
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <div class="product-details-image">${product.image}</div>
        <h2 class="product-details-name">${product.name}</h2>
        <div class="product-details-price">$${product.price}</div>
        <div class="product-details-description">
            <strong>About this product:</strong>
            <p>${product.details}</p>
        </div>
        <div class="contact-info">
            <h4>Contact Information</h4>
            <p><strong>Email:</strong> <span id="contactEmail">your.email@example.com</span></p>
            <p><strong>Cash App:</strong> <span id="contactCashApp">$YourCashAppHandle</span></p>
            <p><strong>Phone:</strong> <span id="contactPhone">+1 (555) 123-4567</span></p>
        </div>
        <button class="purchase-btn" onclick="showPurchaseConfirmation(${product.id})">Purchase</button>
    `;
    
    modal.classList.add('show');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

// Show purchase confirmation dialog
function showPurchaseConfirmation(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <div class="confirmation-modal">
            <h3>Confirm Purchase</h3>
            <p>Have you sent $${product.price} to the Cash App address provided above?</p>
            <div class="confirmation-buttons">
                <button class="btn-yes" onclick="processPurchase(${product.id})">Yes, I Sent It</button>
                <button class="btn-no" onclick="openProductModal(${product.id})">No, Go Back</button>
            </div>
        </div>
    `;
}

// Process purchase and send message
function processPurchase(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get contact info
    const email = document.getElementById('contactEmail')?.innerText || 'Not provided';
    const cashApp = document.getElementById('contactCashApp')?.innerText || 'Not provided';
    const phone = document.getElementById('contactPhone')?.innerText || 'Not provided';
    
    // Create message object
    const message = {
        productName: product.name,
        productPrice: product.price,
        productId: product.id,
        timestamp: new Date().toLocaleString(),
        buyerNote: 'Customer claims to have sent payment via Cash App'
    };
    
    // Save to admin messages
    adminMessages.push(message);
    localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
    
    // Show success message
    const details = document.getElementById('productDetails');
    details.innerHTML = `
        <div class="confirmation-modal">
            <h3>Thank You! 🎉</h3>
            <div class="success-message">
                <strong>Purchase Confirmed!</strong>
                <p>Your payment for <strong>${product.name}</strong> has been recorded.</p>
            </div>
            <p>A message has been sent to the admin. You will be contacted shortly with delivery details.</p>
            <p style="margin-top: 20px; color: #999; font-size: 0.9rem;">
                If you have any questions, reach out using the contact information provided.
            </p>
            <button class="purchase-btn" onclick="closeProductModal()" style="margin-top: 20px;">Close</button>
        </div>
    `;
}

// Open admin panel
function openAdminPanel() {
    document.getElementById('adminModal').classList.add('show');
    document.getElementById('adminPassword').focus();
}

// Close admin panel
function closeAdminPanel() {
    document.getElementById('adminModal').classList.remove('show');
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminPassword').parentElement.style.display = 'flex';
}

// Login to admin panel
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'ECOMMERCE44') {
        // Load messages from localStorage
        const stored = localStorage.getItem('adminMessages');
        adminMessages = stored ? JSON.parse(stored) : [];
        
        // Show admin dashboard
        document.getElementById('adminPassword').parentElement.style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        
        // Display messages
        displayAdminMessages();
    } else {
        alert('❌ Incorrect password. Access denied.');
        document.getElementById('adminPassword').value = '';
    }
}

// Display admin messages
function displayAdminMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    
    if (adminMessages.length === 0) {
        messagesList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No messages yet</p>';
        return;
    }
    
    adminMessages.forEach((msg, index) => {
        const msgElement = document.createElement('div');
        msgElement.className = 'message-item';
        msgElement.innerHTML = `
            <strong>📦 ${msg.productName}</strong>
            <p>Price: $${msg.productPrice}</p>
            <p>Status: Customer claims payment sent via Cash App</p>
            <small>Received: ${msg.timestamp}</small>
            <button onclick="deleteMessage(${index})" style="margin-top: 10px; padding: 5px 10px; background-color: #cc0000; color: white; border: none; border-radius: 3px; cursor: pointer;">Delete</button>
        `;
        messagesList.appendChild(msgElement);
    });
}

// Delete message
function deleteMessage(index) {
    adminMessages.splice(index, 1);
    localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
    displayAdminMessages();
}

// Generate falling stars animation
function generateFallingStars() {
    const container = document.getElementById('starsContainer');
    
    // Create stars periodically for continuous effect
    setInterval(() => {
        // Only generate stars on pages that should have them
        if (document.getElementById('productModal').classList.contains('show')) {
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = '⭐';
            
            // Random horizontal position
            const randomLeft = Math.random() * 100;
            star.style.left = randomLeft + '%';
            star.style.top = '-20px';
            
            // Random animation duration (3-6 seconds)
            const duration = 3 + Math.random() * 3;
            star.style.animationDuration = duration + 's';
            
            // Random delay
            const delay = Math.random() * 0.5;
            star.style.animationDelay = delay + 's';
            
            container.appendChild(star);
            
            // Remove star after animation completes
            setTimeout(() => {
                star.remove();
            }, (duration + delay) * 1000);
        }
    }, 300);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    const adminModal = document.getElementById('adminModal');
    
    if (event.target === productModal) {
        closeProductModal();
    }
    if (event.target === adminModal) {
        closeAdminPanel();
    }
}

// Allow pressing Enter to login
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginAdmin();
            }
        });
    }
});
