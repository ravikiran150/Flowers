// Sample product data
const products = [
    {
        id: 1,
        title: "Spring Blossom Bouquet",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "A vibrant mix of seasonal flowers perfect for any occasion."
    },
    {
        id: 2,
        title: "Elegant Roses Arrangement",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "A dozen premium roses in an elegant vase."
    },
    {
        id: 3,
        title: "Wildflower Collection",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1440353451861-3e5fa9f781b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Rustic wildflowers that bring nature indoors."
    },
    {
        id: 4,
        title: "Luxury Orchids",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1560713781-d9b2e3f6cbf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Exotic orchids for a touch of elegance."
    },
    {
        id: 5,
        title: "Sunshine Daisies",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1495231916356-a86217efff12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Bright and cheerful daisies to lift your spirits."
    },
    {
        id: 6,
        title: "Romantic Tulips",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Beautiful tulips in a romantic color palette."
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
const checkoutBtn = document.querySelector('.checkout-btn');
const recommendBtn = document.getElementById('recommend-btn');
const occasionInput = document.getElementById('occasion-input');
const aiResults = document.getElementById('ai-results');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
    
    // Update cart modal
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                <p>Qty: ${item.quantity}</p>
            </div>
            <i class="fas fa-times cart-item-remove" data-id="${item.id}"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    // Update total
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove from cart
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show cart notification
function showCartNotification() {
    cartIcon.classList.add('animate-bounce');
    setTimeout(() => {
        cartIcon.classList.remove('animate-bounce');
    }, 1000);
}

// AI Recommendation (simulated)
function getAIRecommendation() {
    const occasion = occasionInput.value.trim();
    
    if (!occasion) {
        alert('Please enter an occasion');
        return;
    }
    
    // Simulate AI response
    const recommendations = {
        'birthday': [
            "Vibrant Birthday Bouquet ($49.99) - A colorful mix of roses, lilies, and daisies",
            "Elegant Rose Arrangement ($59.99) - Classic red roses with baby's breath",
            "Fun Balloon Flowers ($39.99) - Flowers with festive balloons"
        ],
        'anniversary': [
            "Romantic Red Roses ($69.99) - Two dozen long-stemmed red roses",
            "Luxury Orchid Collection ($79.99) - Exotic orchids in a ceramic vase",
            "Love Blooms ($59.99) - Mixed flowers with romantic hues"
        ],
        'valentine': [
            "Sweetheart's Special ($89.99) - Red roses with chocolates",
            "Love in Bloom ($69.99) - Mixed flowers with roses",
            "Valentine's Tulips ($59.99) - Red and pink tulips"
        ],
        'default': [
            "Seasonal Special ($44.99) - Fresh seasonal flowers",
            "Premium Mixed Bouquet ($54.99) - A variety of premium flowers",
            "Cheerful Daisies ($39.99) - Bright and happy daisies"
        ]
    };
    
    const results = recommendations[occasion.toLowerCase()] || recommendations['default'];
    
    aiResults.innerHTML = '<h3>AI Recommendations:</h3><ul>' + 
        results.map(item => `<li>${item}</li>`).join('') + '</ul>';
    aiResults.style.display = 'block';
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty');
    } else {
        alert(`Proceeding to checkout. Total: $${cartTotal.textContent}`);
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    }
});

recommendBtn.addEventListener('click', getAIRecommendation);
occasionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getAIRecommendation();
    }
});

// Subscription buttons
document.querySelectorAll('.subscribe-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const plan = e.target.getAttribute('data-plan');
        alert(`You've selected the ${plan} subscription plan!`);
    });
});

// Initialize
displayProducts();
updateCart();
