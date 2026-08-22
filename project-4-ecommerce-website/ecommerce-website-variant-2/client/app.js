// ---------- CONFIG ----------
const API_BASE = 'http://localhost:5000/api';

// ---------- STATE ----------
let products = [];
let cart = JSON.parse(localStorage.getItem('ecomCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ecomWishlist')) || [];
let currentUser = JSON.parse(localStorage.getItem('ecomUser')) || null;
let currentCategory = 'all';
let searchQuery = '';
let isLoggedIn = !!currentUser;

// ---------- DOM REFS ----------
const appContent = document.getElementById('appContent');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryContainer = document.getElementById('categoryContainer');
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartBadge = document.getElementById('cartBadge');
const proceedCheckout = document.getElementById('proceedCheckout');
const authBtn = document.getElementById('authBtn');
const authLabel = document.getElementById('authLabel');
const authOverlay = document.getElementById('authOverlay');
const authClose = document.getElementById('authClose');
const authModalTitle = document.getElementById('authModalTitle');
const authUsername = document.getElementById('authUsername');
const authPassword = document.getElementById('authPassword');
const authSubmit = document.getElementById('authSubmit');
const authToggleLink = document.getElementById('authToggleLink');
const authToggleText = document.getElementById('authToggleText');
const authError = document.getElementById('authError');
const themeToggle = document.getElementById('themeToggle');
const wishlistIcon = document.getElementById('wishlistIcon');
const wishlistBadge = document.getElementById('wishlistBadge');
const adminLink = document.getElementById('adminLink');

let isLoginMode = true;

// ---------- ROUTER ----------
function navigate() {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('product/')) {
        const id = hash.split('/')[1];
        renderProductDetail(id);
    } else if (hash === 'admin') {
        renderAdminDashboard();
    } else {
        renderHome();
    }
}

window.addEventListener('hashchange', navigate);

// ---------- API HELPERS ----------
async function apiFetch(endpoint, options = {}) {
    const url = API_BASE + endpoint;
    const headers = { 'Content-Type': 'application/json' };
    if (currentUser && currentUser.token) {
        headers['Authorization'] = 'Bearer ' + currentUser.token;
    }
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || 'API error');
    }
    return res.json();
}

// ---------- RENDER HOME (Product Listing) ----------
async function renderHome() {
    try {
        products = await apiFetch('/products');
    } catch(e) { products = []; }
    // Category filter
    let filtered = products;
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    // Render grid
    let html = `<div class="categories" id="categoryContainer">`;
    const cats = ['all', 'electronics', 'clothing', 'books', 'home'];
    cats.forEach(c => {
        const active = c === currentCategory ? 'active-cat' : '';
        html += `<button class="${active}" data-category="${c}">${c.charAt(0).toUpperCase()+c.slice(1)}</button>`;
    });
    html += `</div><div class="product-grid">`;
    if (filtered.length === 0) {
        html += `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:#94a3b8;"><i class="fas fa-search" style="font-size:40px;display:block;margin-bottom:12px;"></i>No products found.</div>`;
    } else {
        filtered.forEach(p => {
            const inStock = p.stock > 0;
            const inWishlist = wishlist.includes(p._id);
            html += `
                <div class="product-card" data-id="${p._id}">
                    <img src="${p.image || 'https://placehold.co/300x300/3b82f6/ffffff?text=Product'}" alt="${p.name}" loading="lazy" />
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">$${p.price.toFixed(2)}</div>
                    <div class="product-rating">${'★'.repeat(Math.floor(p.rating || 0))}${(p.rating||0)%1>=0.5?'★':''} (${p.numReviews||0})</div>
                    <button class="add-to-cart ${!inStock?'out-of-stock':''}" data-id="${p._id}" ${!inStock?'disabled':''}>
                        ${inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="wishlist-btn ${inWishlist?'active':''}" data-id="${p._id}"><i class="fas fa-heart"></i></button>
                </div>
            `;
        });
    }
    html += `</div>`;
    appContent.innerHTML = html;

    // Re-bind events
    document.querySelectorAll('.categories button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.categories button').forEach(b => b.classList.remove('active-cat'));
            btn.classList.add('active-cat');
            currentCategory = btn.dataset.category;
            renderHome();
        });
    });
    document.querySelectorAll('.add-to-cart:not(.out-of-stock)').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); addToCart(btn.dataset.id); });
    });
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); toggleWishlist(btn.dataset.id); });
    });
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.id;
            window.location.hash = 'product/' + id;
        });
    });
    updateBadges();
}

// ---------- PRODUCT DETAIL ----------
async function renderProductDetail(id) {
    try {
        const product = await apiFetch(`/products/${id}`);
        const inWishlist = wishlist.includes(product._id);
        const inStock = product.stock > 0;
        let html = `
            <div class="product-detail">
                <div class="detail-image"><img src="${product.image || 'https://placehold.co/300x300/3b82f6/ffffff?text=Product'}" alt="${product.name}" /></div>
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <div class="rating">⭐ ${product.rating || 0} (${product.numReviews || 0} reviews)</div>
                    <div class="description">${product.description || 'No description available.'}</div>
                    <div class="stock">${inStock ? 'In Stock ('+product.stock+')' : 'Out of Stock'}</div>
                    <div class="detail-actions">
                        <button class="add-cart" data-id="${product._id}" ${!inStock?'disabled':''}>Add to Cart</button>
                        <button class="wishlist-toggle ${inWishlist?'active':''}" data-id="${product._id}"><i class="fas fa-heart"></i> ${inWishlist?'Remove from Wishlist':'Add to Wishlist'}</button>
                    </div>
                </div>
            </div>
            <div class="reviews-section">
                <h3>Reviews</h3>
                <div id="reviewsList"></div>
                ${currentUser ? `
                <div class="review-form">
                    <h4>Write a Review</h4>
                    <select id="reviewRating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4" selected>4</option><option value="5">5</option></select>
                    <textarea id="reviewComment" placeholder="Your comment..."></textarea>
                    <button id="submitReview" data-id="${product._id}">Submit Review</button>
                </div>` : '<p style="color:#94a3b8;">Please login to write a review.</p>'}
            </div>
        `;
        appContent.innerHTML = html;

        // Bind events
        document.querySelector('.add-cart')?.addEventListener('click', function() { addToCart(this.dataset.id); });
        document.querySelector('.wishlist-toggle')?.addEventListener('click', function() { toggleWishlist(this.dataset.id); });
        document.getElementById('submitReview')?.addEventListener('click', async function() {
            const rating = document.getElementById('reviewRating').value;
            const comment = document.getElementById('reviewComment').value;
            if (!comment) { alert('Please enter a comment.'); return; }
            try {
                await apiFetch('/reviews', {
                    method: 'POST',
                    body: JSON.stringify({ productId: this.dataset.id, rating, comment })
                });
                alert('Review submitted!');
                renderProductDetail(this.dataset.id);
            } catch(e) { alert('Error: '+e.message); }
        });

        // Load reviews
        try {
            const reviews = await apiFetch(`/products/${product._id}/reviews`);
            const list = document.getElementById('reviewsList');
            if (reviews.length === 0) {
                list.innerHTML = '<p style="color:#94a3b8;">No reviews yet.</p>';
            } else {
                list.innerHTML = reviews.map(r => `
                    <div class="review-card">
                        <div class="review-user">${r.user?.username || 'Anonymous'}</div>
                        <div class="review-rating">⭐ ${r.rating}</div>
                        <div class="review-comment">${r.comment}</div>
                    </div>
                `).join('');
            }
        } catch(e) {}
    } catch(e) {
        appContent.innerHTML = '<p style="color:#ef4444;">Product not found.</p>';
    }
}

// ---------- WISHLIST ----------
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) wishlist.splice(index, 1);
    else wishlist.push(productId);
    localStorage.setItem('ecomWishlist', JSON.stringify(wishlist));
    updateBadges();
    // Re-render current view
    navigate();
}

// ---------- CART ----------
function addToCart(productId) {
    const product = products.find(p => p._id === productId);
    if (!product || product.stock <= 0) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        if (existing.quantity < product.stock) existing.quantity++;
        else { alert('Not enough stock!'); return; }
    } else {
        cart.push({ id: productId, name: product.name, price: product.price, image: product.image, quantity: 1 });
    }
    localStorage.setItem('ecomCart', JSON.stringify(cart));
    updateBadges();
    cartOverlay.classList.add('open');
    renderCartItems();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('ecomCart', JSON.stringify(cart));
    updateBadges();
    renderCartItems();
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) { removeFromCart(productId); return; }
    const product = products.find(p => p._id === productId);
    if (product && newQty > product.stock) { alert('Not enough stock!'); return; }
    item.quantity = newQty;
    localStorage.setItem('ecomCart', JSON.stringify(cart));
    updateBadges();
    renderCartItems();
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `<li class="empty-cart"><i class="fas fa-shopping-bag"></i> Your cart is empty</li>`;
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    cartItems.innerHTML = cart.map(item => `
        <li class="cart-item">
            <img src="${item.image || 'https://placehold.co/56x56'}" alt="${item.name}" />
            <div class="cart-item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" data-id="${item.id}" data-delta="-1">-</button>
                <span class="qty">${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </li>
    `).join('');
    cartItems.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); changeQuantity(btn.dataset.id, parseInt(btn.dataset.delta)); });
    });
    cartItems.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); removeFromCart(btn.dataset.id); });
    });
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cartTotalPrice.textContent = '$' + total.toFixed(2);
}

function updateBadges() {
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartBadge.textContent = totalItems;
    wishlistBadge.textContent = wishlist.length;
}

// ---------- CHECKOUT ----------
proceedCheckout.addEventListener('click', () => {
    if (cart.length === 0) { alert('Your cart is empty.'); return; }
    if (!currentUser) { alert('Please login first.'); openAuthModal(); return; }
    // Show checkout form in main content
    appContent.innerHTML = `
        <div class="checkout-section">
            <h3>📦 Checkout</h3>
            <input type="text" id="addressInput" placeholder="Shipping Address" />
            <input type="text" id="paymentInput" placeholder="Card Number (mock)" />
            <button class="place-order" id="placeOrderBtn">Place Order</button>
            <div id="orderConfirmation" class="order-confirmation hidden">
                <i class="fas fa-check-circle"></i>
                <h3>Order Placed!</h3>
                <p>Thank you for your purchase. We'll send you a confirmation email.</p>
            </div>
        </div>
    `;
    document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);
    cartOverlay.classList.remove('open');
});

async function placeOrder() {
    const address = document.getElementById('addressInput').value.trim();
    if (!address) { alert('Please enter a shipping address.'); return; }
    try {
        const orderData = {
            items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
            shippingAddress: address,
            paymentMethod: 'card'
        };
        await apiFetch('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        // Clear cart
        cart = [];
        localStorage.setItem('ecomCart', JSON.stringify(cart));
        updateBadges();
        document.getElementById('orderConfirmation').classList.remove('hidden');
        document.querySelector('.place-order').disabled = true;
        setTimeout(() => {
            window.location.hash = '';
            navigate();
        }, 3000);
    } catch(e) {
        alert('Order failed: '+e.message);
    }
}

// ---------- ADMIN DASHBOARD ----------
async function renderAdminDashboard() {
    if (!currentUser || !currentUser.isAdmin) {
        appContent.innerHTML = '<p style="color:#ef4444;">Access denied. Admin only.</p>';
        return;
    }
    try {
        const [productsData, ordersData] = await Promise.all([
            apiFetch('/admin/products', { headers: { 'Authorization': 'Bearer '+currentUser.token } }),
            apiFetch('/admin/orders', { headers: { 'Authorization': 'Bearer '+currentUser.token } })
        ]);
        let html = `
            <div class="admin-panel">
                <h2>📊 Admin Dashboard</h2>
                <h3>Products</h3>
                <button id="addProductBtn" style="margin-bottom:12px;padding:8px 20px;background:#3b82f6;color:#fff;border:none;border-radius:30px;cursor:pointer;">+ Add Product</button>
                <table class="admin-table"><thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>
        `;
        productsData.forEach(p => {
            html += `<tr><td>${p.name}</td><td>$${p.price}</td><td>${p.stock}</td><td class="actions">
                <button class="edit-product" data-id="${p._id}"><i class="fas fa-edit"></i></button>
                <button class="delete-product" data-id="${p._id}"><i class="fas fa-trash"></i></button>
            </td></tr>`;
        });
        html += `</tbody></table>
                <h3>Orders</h3>
                <table class="admin-table"><thead><tr><th>Order ID</th><th>User</th><th>Total</th><th>Status</th><th>Action</th></tr></thead><tbody>
        `;
        ordersData.forEach(o => {
            html += `<tr><td>${o._id}</td><td>${o.user?.username || 'N/A'}</td><td>$${o.totalPrice}</td><td>${o.status}</td><td>
                <select class="order-status" data-id="${o._id}">
                    <option value="Processing"${o.status==='Processing'?' selected':''}>Processing</option>
                    <option value="Shipped"${o.status==='Shipped'?' selected':''}>Shipped</option>
                    <option value="Delivered"${o.status==='Delivered'?' selected':''}>Delivered</option>
                    <option value="Cancelled"${o.status==='Cancelled'?' selected':''}>Cancelled</option>
                </select>
            </td></tr>`;
        });
        html += `</tbody></table></div>`;
        appContent.innerHTML = html;

        // Bind actions
        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', async function() {
                if (!confirm('Delete this product?')) return;
                try {
                    await apiFetch('/admin/products/'+this.dataset.id, { method: 'DELETE' });
                    renderAdminDashboard();
                } catch(e) { alert(e.message); }
            });
        });
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                // Show edit form (simplified: prompt)
                const name = prompt('New name:');
                if (name) {
                    const price = prompt('New price:');
                    const stock = prompt('New stock:');
                    if (price && stock) {
                        apiFetch('/admin/products/'+id, {
                            method: 'PUT',
                            body: JSON.stringify({ name, price: parseFloat(price), stock: parseInt(stock) })
                        }).then(() => renderAdminDashboard()).catch(e => alert(e.message));
                    }
                }
            });
        });
        document.querySelectorAll('.order-status').forEach(sel => {
            sel.addEventListener('change', async function() {
                const status = this.value;
                const id = this.dataset.id;
                try {
                    await apiFetch('/admin/orders/'+id, {
                        method: 'PUT',
                        body: JSON.stringify({ status })
                    });
                    renderAdminDashboard();
                } catch(e) { alert(e.message); }
            });
        });
        document.getElementById('addProductBtn')?.addEventListener('click', () => {
            const name = prompt('Product name:');
            if (name) {
                const price = prompt('Price:');
                const category = prompt('Category:');
                const stock = prompt('Stock:');
                const image = prompt('Image URL:');
                apiFetch('/admin/products', {
                    method: 'POST',
                    body: JSON.stringify({ name, price: parseFloat(price), category, stock: parseInt(stock), image })
                }).then(() => renderAdminDashboard()).catch(e => alert(e.message));
            }
        });
    } catch(e) {
        appContent.innerHTML = '<p style="color:#ef4444;">Error loading admin data: '+e.message+'</p>';
    }
}

// ---------- AUTH ----------
function openAuthModal() {
    authOverlay.classList.add('open');
    authError.textContent = '';
    authUsername.value = '';
    authPassword.value = '';
    setAuthMode(true);
}
function closeAuthModal() { authOverlay.classList.remove('open'); }
function setAuthMode(login) {
    isLoginMode = login;
    authModalTitle.textContent = login ? 'Login' : 'Register';
    authSubmit.textContent = login ? 'Login' : 'Register';
    authToggleText.innerHTML = login ?
        "Don't have an account? <span id='authToggleLink'>Register</span>" :
        "Already have an account? <span id='authToggleLink'>Login</span>";
    document.getElementById('authToggleLink').addEventListener('click', toggleAuthMode);
    authError.textContent = '';
}
function toggleAuthMode() { setAuthMode(!isLoginMode); }

authClose.addEventListener('click', closeAuthModal);
authOverlay.addEventListener('click', (e) => { if (e.target === authOverlay) closeAuthModal(); });
authToggleLink.addEventListener('click', toggleAuthMode);

authSubmit.addEventListener('click', async () => {
    const username = authUsername.value.trim();
    const email = authUsername.value.trim(); // using username as email for simplicity
    const password = authPassword.value.trim();
    if (!username || !password) { authError.textContent = 'Please fill in all fields.'; return; }
    try {
        const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
        const data = await apiFetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });
        currentUser = data.user;
        currentUser.token = data.token;
        localStorage.setItem('ecomUser', JSON.stringify(currentUser));
        isLoggedIn = true;
        closeAuthModal();
        updateAuthUI();
        navigate(); // refresh current view
    } catch(e) {
        authError.textContent = e.message;
    }
});

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('ecomUser');
    updateAuthUI();
    navigate();
}

function updateAuthUI() {
    if (currentUser) {
        authLabel.textContent = currentUser.username;
        authBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.username} <i class="fas fa-sign-out-alt" style="margin-left:6px;"></i>`;
        authBtn.onclick = logout;
        if (currentUser.isAdmin) {
            adminLink.classList.remove('hidden');
            adminLink.onclick = () => { window.location.hash = 'admin'; };
        } else {
            adminLink.classList.add('hidden');
        }
    } else {
        authLabel.textContent = 'Login';
        authBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
        authBtn.onclick = openAuthModal;
        adminLink.classList.add('hidden');
    }
}

// ---------- THEME ----------
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('ecomTheme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('ecomTheme', 'light');
    }
});
if (localStorage.getItem('ecomTheme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// ---------- SEARCH ----------
searchBtn.addEventListener('click', () => { searchQuery = searchInput.value; renderHome(); });
searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') { searchQuery = searchInput.value; renderHome(); } });

// ---------- CART OVERLAY ----------
cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('open');
    renderCartItems();
});
cartClose.addEventListener('click', () => cartOverlay.classList.remove('open'));
cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) cartOverlay.classList.remove('open'); });

// ---------- INIT ----------
updateAuthUI();
navigate();
