const mobile = document.querySelector('.mobile');
const navLinks = document.querySelector('.nav_links');
mobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
const navItems = document.querySelectorAll('.nav_links li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
// dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.classList.replace('fa-moon', 'fa-sun');
}

// Toggle event listener & save user pref
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.classList.replace('fa-sun', 'fa-moon');
    }
});

// Cart functionality
const cartIcon = document.querySelector('.fa-cart-shopping');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Cart data structure
let cart = [];

// Open cart
cartIcon.addEventListener('click', () => {
    cartOverlay.style.display = 'flex';
    updateCartUI();
});

// Close cart
closeCart.addEventListener('click', () => {
    cartOverlay.style.display = 'none';
});

// Close cart when clicking outside
cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        cartOverlay.style.display = 'none';
    }
});

// Update cart UI
function updateCartUI() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
    } else {
        let total = 0;
        cartItems.innerHTML = cart.map(item => {
            total += parseFloat(item.price.replace('$', ''));
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.product-card button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        const productImage = productCard.querySelector('img').src;
        
        // Add to cart
        cart.push({
            id: Date.now(),
            name: productName,
            price: productPrice,
            image: productImage
        });
        
        // Update cart UI
        updateCartUI();
        
        // Show cart notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <p>${productName} added to cart!</p>
            <p>${productPrice}</p>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});

// Remove item from cart
document.addEventListener('click', (e) => {
    if (e.target.closest('.remove-item')) {
        const itemId = parseInt(e.target.closest('.remove-item').dataset.id);
        cart = cart.filter(item => item.id !== itemId);
        updateCartUI();
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'newsletter-success';
    successMessage.textContent = 'Thank you for subscribing!';
    
    newsletterForm.appendChild(successMessage);
    
    // Clear form and remove success message after 3 seconds
    setTimeout(() => {
        newsletterForm.reset();
        successMessage.remove();
    }, 3000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});