"use strict";

/* ---------------------------------------------------------
   ShopFront — fully client-side ecommerce demo.
   No backend, no build step: catalog, cart and checkout all
   run in the browser and persist to localStorage. This is
   what makes it the one ecommerce build that actually works
   live on GitHub Pages, unlike the four full MERN variants.
--------------------------------------------------------- */
(function shopFront() {
  var CART_KEY = "shopfront_cart_v1";
  var ORDERS_KEY = "shopfront_orders_v1";

  var grid = document.getElementById("product-grid");
  var categoryFilter = document.getElementById("category-filter");
  var searchInput = document.getElementById("search-input");
  var resultsLabel = document.getElementById("results-label");
  var emptyState = document.getElementById("empty-state");

  var cartToggle = document.getElementById("cart-toggle");
  var cartDrawer = document.getElementById("cart-drawer");
  var cartClose = document.getElementById("cart-close");
  var drawerOverlay = document.getElementById("drawer-overlay");
  var cartItemsEl = document.getElementById("cart-items");
  var cartCountEl = document.getElementById("cart-count");
  var cartTotalEl = document.getElementById("cart-total");
  var checkoutBtn = document.getElementById("checkout-btn");

  var checkoutOverlay = document.getElementById("checkout-overlay");
  var checkoutClose = document.getElementById("checkout-close");
  var checkoutForm = document.getElementById("checkout-form");
  var checkoutFormView = document.getElementById("checkout-form-view");
  var checkoutSuccessView = document.getElementById("checkout-success-view");
  var orderSummaryEl = document.getElementById("order-summary");
  var orderIdEl = document.getElementById("order-id");
  var orderCloseBtn = document.getElementById("order-close-btn");

  var toastEl = document.getElementById("toast");

  var state = {
    activeCategory: "all",
    query: "",
    cart: loadCart(),
  };

  /* ---------------- persistence ---------------- */
  function loadCart() {
    try {
      var raw = window.localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) — cart just won't persist */
    }
  }

  function saveOrder(order) {
    try {
      var raw = window.localStorage.getItem(ORDERS_KEY);
      var orders = raw ? JSON.parse(raw) : [];
      orders.push(order);
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      /* ignore */
    }
  }

  /* ---------------- catalog rendering ---------------- */
  function renderCategoryChips() {
    categoryFilter.innerHTML = "";
    CATEGORIES.forEach(function (cat) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip" + (cat.id === state.activeCategory ? " is-active" : "");
      chip.textContent = cat.label;
      chip.setAttribute("data-cat", cat.id);
      chip.addEventListener("click", function () {
        state.activeCategory = cat.id;
        renderCategoryChips();
        renderProducts();
      });
      categoryFilter.appendChild(chip);
    });
  }

  function getFilteredProducts() {
    return PRODUCTS.filter(function (p) {
      var matchesCategory = state.activeCategory === "all" || p.category === state.activeCategory;
      var haystack = (p.name + " " + p.blurb + " " + p.category).toLowerCase();
      var matchesQuery = state.query === "" || haystack.indexOf(state.query) !== -1;
      return matchesCategory && matchesQuery;
    });
  }

  function renderProducts() {
    var items = getFilteredProducts();
    grid.innerHTML = "";

    resultsLabel.textContent =
      items.length === PRODUCTS.length
        ? "Showing all " + PRODUCTS.length + " products"
        : "Showing " + items.length + " of " + PRODUCTS.length + " products";

    emptyState.hidden = items.length !== 0;

    items.forEach(function (p) {
      var card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML =
        '<div class="product-card__emoji" aria-hidden="true">' + p.emoji + "</div>" +
        (p.tag ? '<span class="product-card__tag">' + p.tag + "</span>" : "") +
        "<h3>" + escapeHtml(p.name) + "</h3>" +
        '<p class="blurb">' + escapeHtml(p.blurb) + "</p>" +
        '<div class="product-card__meta">' +
        '<span class="product-card__price">$' + p.price.toFixed(2) + "</span>" +
        '<span class="product-card__rating">★ ' + p.rating.toFixed(1) + "</span>" +
        "</div>" +
        '<p class="product-card__stock">' + p.stock + " in stock</p>" +
        '<button type="button" class="btn btn--primary btn--sm" data-add="' + p.id + '">Add to cart</button>';
      grid.appendChild(card);
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  grid.addEventListener("click", function (evt) {
    var btn = evt.target.closest("[data-add]");
    if (!btn) return;
    var id = btn.getAttribute("data-add");
    addToCart(id);
    btn.textContent = "Added ✓";
    window.setTimeout(function () {
      btn.textContent = "Add to cart";
    }, 900);
  });

  searchInput.addEventListener("input", function () {
    state.query = searchInput.value.trim().toLowerCase();
    renderProducts();
  });

  /* ---------------- cart logic ---------------- */
  function addToCart(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    saveCart();
    renderCart();
    showToast("Added to cart");
  }

  function changeQty(id, delta) {
    if (!state.cart[id]) return;
    state.cart[id] += delta;
    if (state.cart[id] <= 0) delete state.cart[id];
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    delete state.cart[id];
    saveCart();
    renderCart();
  }

  function cartLines() {
    return Object.keys(state.cart)
      .map(function (id) {
        var product = PRODUCTS.filter(function (p) { return p.id === id; })[0];
        if (!product) return null;
        return { product: product, qty: state.cart[id] };
      })
      .filter(Boolean);
  }

  function cartTotal(lines) {
    return lines.reduce(function (sum, line) { return sum + line.product.price * line.qty; }, 0);
  }

  function renderCart() {
    var lines = cartLines();
    var totalCount = lines.reduce(function (sum, l) { return sum + l.qty; }, 0);
    cartCountEl.textContent = String(totalCount);
    checkoutBtn.disabled = lines.length === 0;

    if (lines.length === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty. Add a product to get started.</p>';
      cartTotalEl.textContent = "$0.00";
      return;
    }

    cartItemsEl.innerHTML = "";
    lines.forEach(function (line) {
      var row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<div class="cart-item__emoji" aria-hidden="true">' + line.product.emoji + "</div>" +
        '<div class="cart-item__info">' +
        "<h4>" + escapeHtml(line.product.name) + "</h4>" +
        '<div class="cart-item__price">$' + line.product.price.toFixed(2) + " × " + line.qty + "</div>" +
        '<div class="cart-item__qty">' +
        '<button type="button" data-dec="' + line.product.id + '" aria-label="Decrease quantity">−</button>' +
        "<span>" + line.qty + "</span>" +
        '<button type="button" data-inc="' + line.product.id + '" aria-label="Increase quantity">+</button>' +
        '<button type="button" class="cart-item__remove" data-remove="' + line.product.id + '">Remove</button>' +
        "</div></div>";
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = "$" + cartTotal(lines).toFixed(2);
  }

  cartItemsEl.addEventListener("click", function (evt) {
    var inc = evt.target.closest("[data-inc]");
    var dec = evt.target.closest("[data-dec]");
    var rem = evt.target.closest("[data-remove]");
    if (inc) changeQty(inc.getAttribute("data-inc"), 1);
    if (dec) changeQty(dec.getAttribute("data-dec"), -1);
    if (rem) removeFromCart(rem.getAttribute("data-remove"));
  });

  /* ---------------- drawer + modal open/close ---------------- */
  function openCart() {
    cartDrawer.classList.add("is-open");
    drawerOverlay.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
  }
  function closeCart() {
    cartDrawer.classList.remove("is-open");
    drawerOverlay.classList.remove("is-open");
  }
  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  drawerOverlay.addEventListener("click", closeCart);

  function openCheckout() {
    checkoutFormView.hidden = false;
    checkoutSuccessView.hidden = true;
    checkoutOverlay.classList.add("is-open");
  }
  function closeCheckout() {
    checkoutOverlay.classList.remove("is-open");
  }
  checkoutBtn.addEventListener("click", function () {
    if (checkoutBtn.disabled) return;
    closeCart();
    openCheckout();
  });
  checkoutClose.addEventListener("click", closeCheckout);
  checkoutOverlay.addEventListener("click", function (evt) {
    if (evt.target === checkoutOverlay) closeCheckout();
  });

  checkoutForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    var lines = cartLines();
    if (lines.length === 0) return;

    var formData = new FormData(checkoutForm);
    var order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      items: lines.map(function (l) { return { id: l.product.id, name: l.product.name, qty: l.qty, price: l.product.price }; }),
      total: cartTotal(lines),
      placedAt: new Date().toISOString(),
    };
    saveOrder(order);

    orderIdEl.textContent = order.id;
    orderSummaryEl.textContent =
      "Thanks, " + order.name + "! " + lines.length + " item" + (lines.length === 1 ? "" : "s") +
      " for $" + order.total.toFixed(2) + " will be \"delivered\" to " + order.address + ".";

    checkoutFormView.hidden = true;
    checkoutSuccessView.hidden = false;
    checkoutForm.reset();

    state.cart = {};
    saveCart();
    renderCart();
  });

  orderCloseBtn.addEventListener("click", function () {
    closeCheckout();
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closeCart();
      closeCheckout();
    }
  });

  /* ---------------- toast ---------------- */
  var toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 1600);
  }

  /* ---------------- init ---------------- */
  renderCategoryChips();
  renderProducts();
  renderCart();
})();
