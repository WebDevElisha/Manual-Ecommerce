// Single Product Data
const products = [
    {
        id: 1,
        name: "How to create a website for free: No code, No experience, Under 1 hour guide!",
        price: 7,
        image: "https://raw.githubusercontent.com/WebDevElisha/Manual-Ecommerce/main/product-image.png",
        description: "Build a live, professional site with only Google Sites and Canva — no credit card, no design skills, no hosting fees required!",
        details: "Build a live, professional site with only Google Sites and Canva — no credit card, no design skills, no hosting fees required! This comprehensive guide will walk you through creating a stunning website in under one hour, perfect for beginners. Learn step-by-step how to use Google Sites' powerful free tools combined with Canva's beautiful design templates to create a professional online presence without spending a dime."
    }
];

// Admin messages storage
let adminMessages = [];
let adminLoggedIn = false;
let adminContactInfo = {
    cashApp: '$TextmeElisha',
    gmail: 'TextElisha@gmail.com',
    phone: '240-745-5582'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    generateFallingStars();
    loadAdminData();
});

// Load admin data from localStorage
function loadAdminData() {
    const stored = localStorage.getItem('adminMessages');
    adminMessages = stored ? JSON.parse(stored) : [];
    
    const storedContact = localStorage.getItem('adminContactInfo');
    if (storedContact) {
        adminContactInfo = JSON.parse(storedContact);
    }
}

// Load products to the dashboard
function loadProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;"></div>
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

// Toggle between admin page and store
function toggleAdminPage() {
    const mainDashboard = document.getElementById('mainDashboard');
    const adminPage = document.getElementById('adminPage');
    
    const isAdminVisible = adminPage.style.display !== 'none';
    
    if (isAdminVisible) {
        // Go back to store
        adminPage.style.display = 'none';
        mainDashboard.style.display = 'block';
        document.body.style.background = '#f5f5f5';
    } else {
        // Go to admin
        mainDashboard.style.display = 'none';
        adminPage.style.display = 'block';
        document.body.style.background = '#f5f5f5';
        
        if (!adminLoggedIn) {
            document.getElementById('adminLoginForm').style.display = 'block';
            document.getElementById('adminContent').style.display = 'none';
            document.getElementById('adminPassword').focus();
        } else {
            displayAdminDashboard();
        }
    }
}

// Open product modal with details
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <div class="payment-instructions-box">
            <h4>📋 How to Complete Your Purchase</h4>
            <p>After you click "Yes, I'm Done" below:</p>
            <ol style="text-align: left; margin-left: 20px; color: #333;">
                <li>Send $${product.price} to my Cash App: <strong>${adminContactInfo.cashApp}</strong></li>
                <li>DM me Via any of the contact methods</li>
            </ol>
            <p style="margin-top: 10px; font-weight: bold; color: #1a1a1a;">Contact me via:</p>
            <div style="background-color: white; padding: 10px; border-radius: 5px; margin: 10px 0;">
                <p><strong>📱 Phone:</strong> ${adminContactInfo.phone}</p>
                <p><strong>📧 Gmail:</strong> ${adminContactInfo.gmail}</p>
                <p><strong>💰 Cash App:</strong> ${adminContactInfo.cashApp}</p>
            </div>
        </div>

        <div class="product-details-image"><img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>
        <h2 class="product-details-name">${product.name}</h2>
        <div class="product-details-price">$${product.price}</div>
        <div class="product-details-description">
            <strong>About this product:</strong>
            <p>${product.details}</p>
        </div>
        
        <div class="quantity-section">
            <h4>Quantity</h4>
            <div class="quantity-input-group">
                <button class="quantity-btn" onclick="decreaseQuantity()">−</button>
                <input type="number" id="quantityInput" value="1" min="1" />
                <button class="quantity-btn" onclick="increaseQuantity()">+</button>
            </div>
        </div>
        <div class="notes-section">
            <h4>Notes (Required for payment confirmation)</h4>
            <textarea id="notesInput" placeholder="Add any notes or special requests, (you may have dmed me, but what is your cashtag, And contact method info E.g. Social media handle)"></textarea>
        </div>
        <button class="purchase-btn" onclick="showPurchaseConfirmation(${product.id})">Purchase</button>
    `;
    
    modal.classList.add('show');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Show purchase confirmation dialog
function showPurchaseConfirmation(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const notes = document.getElementById('notesInput').value;
    
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    const totalPrice = (product.price * quantity).toFixed(2);
    
    details.innerHTML = `
        <div class="confirmation-modal">
            <h3>Confirm Purchase</h3>
            <p>Product: <strong>${product.name}</strong></p>
            <p>Quantity: <strong>${quantity}</strong></p>
            <p>Total Price: <strong>$${totalPrice}</strong></p>
            <p style="margin-top: 20px; color: #cc0000; font-weight: bold;">⚠️ Send $${totalPrice} to ${adminContactInfo.cashApp} before confirming!</p>
            <p>Have you sent the payment?</p>
            <div class="confirmation-buttons">
                <button class="btn-yes" onclick="processPurchase(${product.id}, ${quantity}, '${notes.replace(/'/g, "\\'")}', '${totalPrice}')">Yes, I'm Done</button>
                <button class="btn-no" onclick="openProductModal(${product.id})">No, Go Back</button>
            </div>
        </div>
    `;
}

// Process purchase and send message
function processPurchase(productId, quantity, notes, totalPrice) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create message object
    const message = {
        productName: product.name,
        productPrice: product.price,
        totalPrice: parseFloat(totalPrice),
        productId: product.id,
        quantity: quantity,
        notes: notes || 'No notes',
        timestamp: new Date().toLocaleString(),
        status: 'Pending Confirmation'
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
                <strong>Order Confirmed!</strong>
                <p>Your order for <strong>${quantity}x ${product.name}</strong> has been recorded.</p>
            </div>
            <p>Total Amount Due: <strong>$${totalPrice}</strong></p>
            <div style="background-color: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; color: #333;"><strong>📝 Next Steps:</strong></p>
                <p style="margin: 10px 0 0 0; color: #333;">1. Send $${totalPrice} to <strong>${adminContactInfo.cashApp}</strong></p>
                <p style="margin: 10px 0 0 0; color: #333;">2. Contact me to confirm payment:</p>
                <p style="margin: 5px 0 0 20px; color: #333;">📱 ${adminContactInfo.phone}</p>
                <p style="margin: 5px 0 0 20px; color: #333;">📧 ${adminContactInfo.gmail}</p>
            </div>
            <p style="margin-top: 20px; color: #999; font-size: 0.9rem;">
                Your order has been added to the admin dashboard and is awaiting payment confirmation.
            </p>
            <button class="purchase-btn" onclick="closeProductModal()" style="margin-top: 20px;">Close</button>
        </div>
    `;
}

// Login to admin panel
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'ECOMMERCE44') {
        adminLoggedIn = true;
        displayAdminDashboard();
    } else {
        alert('❌ Incorrect password. Access denied.');
        document.getElementById('adminPassword').value = '';
    }
}

// Display admin dashboard
function displayAdminDashboard() {
    document.getElementById('adminLoginForm').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    
    const tableBody = document.getElementById('ordersTableBody');
    const noOrdersMsg = document.getElementById('noOrdersMsg');
    
    tableBody.innerHTML = '';
    
    if (adminMessages.length === 0) {
        noOrdersMsg.style.display = 'block';
        return;
    }
    
    noOrdersMsg.style.display = 'none';
    
    adminMessages.forEach((msg, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="order-number">${index + 1}</td>
            <td>${msg.productName}</td>
            <td>$${msg.totalPrice.toFixed(2)}</td>
            <td>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseOrderQuantity(${index})">−</button>
                    <div class="quantity-display">${msg.quantity}</div>
                    <button class="quantity-btn" onclick="increaseOrderQuantity(${index})">+</button>
                </div>
            </td>
            <td class="notes-cell">${msg.notes}</td>
            <td class="time-cell">${msg.timestamp}</td>
            <td class="status-cell">${msg.status}</td>
            <td><button class="delete-btn" onclick="deleteMessage(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Update quantity in admin
function increaseOrderQuantity(index) {
    adminMessages[index].quantity += 1;
    // Recalculate total price
    adminMessages[index].totalPrice = adminMessages[index].productPrice * adminMessages[index].quantity;
    localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
    displayAdminDashboard();
}

function decreaseOrderQuantity(index) {
    if (adminMessages[index].quantity > 1) {
        adminMessages[index].quantity -= 1;
        // Recalculate total price
        adminMessages[index].totalPrice = adminMessages[index].productPrice * adminMessages[index].quantity;
        localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
        displayAdminDashboard();
    }
}

// Delete message
function deleteMessage(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        adminMessages.splice(index, 1);
        localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
        displayAdminDashboard();
    }
}

// Clear all messages
function clearAllMessages() {
    if (confirm('Are you sure you want to clear ALL orders? This cannot be undone.')) {
        adminMessages = [];
        localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
        displayAdminDashboard();
    }
}

// Edit contact info
function editContactInfo() {
    const form = `
        <div style="text-align: left;">
            <p>Cash App: <input type="text" id="editCashApp" value="${adminContactInfo.cashApp}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 3px; margin-bottom: 10px;"></p>
            <p>Gmail: <input type="email" id="editGmail" value="${adminContactInfo.gmail}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 3px; margin-bottom: 10px;"></p>
            <p>Phone: <input type="tel" id="editPhone" value="${adminContactInfo.phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 3px; margin-bottom: 10px;"></p>
        </div>
    `;
    
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <div class="confirmation-modal">
            <h3>Edit Contact Information</h3>
            ${form}
            <div class="confirmation-buttons" style="margin-top: 20px;">
                <button class="btn-yes" onclick="saveContactInfo()">Save</button>
                <button class="btn-no" onclick="closeProductModal()">Cancel</button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

// Save contact info
function saveContactInfo() {
    adminContactInfo.cashApp = document.getElementById('editCashApp').value;
    adminContactInfo.gmail = document.getElementById('editGmail').value;
    adminContactInfo.phone = document.getElementById('editPhone').value;
    
    localStorage.setItem('adminContactInfo', JSON.stringify(adminContactInfo));
    
    // Update display
    document.getElementById('displayCashApp').textContent = adminContactInfo.cashApp;
    document.getElementById('displayGmail').textContent = adminContactInfo.gmail;
    document.getElementById('displayPhone').textContent = adminContactInfo.phone;
    
    closeProductModal();
    alert('✅ Contact information updated successfully!');
}

// Logout from admin
function logoutAdmin() {
    adminLoggedIn = false;
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminLoginForm').style.display = 'block';
    document.getElementById('adminContent').style.display = 'none';
    alert('✅ You have been logged out.');
}

// Generate falling stars animation
function generateFallingStars() {
    const container = document.getElementById('starsContainer');
    
    // Create stars periodically for continuous effect
    setInterval(() => {
        // Only generate stars on product pages that should have them
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
    
    if (event.target === productModal) {
        closeProductModal();
    }
}

// Allow pressing Enter to login
document.addEventListener('keypress', function(e) {
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm && adminLoginForm.style.display !== 'none' && e.key === 'Enter') {
        loginAdmin();
    }
});
