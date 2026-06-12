// =============================================
// BEZTRO ELECTRONICS — MAIN JAVASCRIPT
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // --- Active nav link ---
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Cart counter (localStorage) ---
  function getCart() {
    return JSON.parse(localStorage.getItem('beztro_cart') || '[]');
  }

  function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? 'flex' : 'none';
    });
  }

  updateCartBadge();

  // --- Add to cart buttons ---
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = this.dataset.price;
      const cart = getCart();
      const existing = cart.find(i => i.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name, price, qty: 1 });
      }
      localStorage.setItem('beztro_cart', JSON.stringify(cart));
      updateCartBadge();
      showToast(`${name} ditambahkan ke keranjang!`);
    });
  });

  // --- Wishlist buttons ---
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.querySelector('i').classList.toggle('ti-heart');
      this.querySelector('i').classList.toggle('ti-heart-filled');
      this.querySelector('i').style.color =
        this.querySelector('i').classList.contains('ti-heart-filled') ? '#EF4444' : '';
    });
  });

  // --- Toast notification ---
  function showToast(message) {
    let toast = document.getElementById('bz-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bz-toast';
      toast.style.cssText = `
        position: fixed; bottom: 28px; right: 28px;
        background: #2D3F5F; color: #fff;
        padding: 12px 20px; border-radius: 8px;
        font-size: 13px; font-family: inherit;
        z-index: 9999; opacity: 0;
        transition: opacity 0.3s;
        display: flex; align-items: center; gap: 8px;
        max-width: 300px;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="ti ti-check" style="color:#4ade80; font-size:16px;"></i>${message}`;
    toast.style.opacity = '1';
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2800);
  }

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // --- Quantity buttons on product detail ---
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyValue = document.getElementById('qty-value');
  if (qtyMinus && qtyPlus && qtyValue) {
    qtyMinus.addEventListener('click', () => {
      let v = parseInt(qtyValue.textContent);
      if (v > 1) qtyValue.textContent = v - 1;
    });
    qtyPlus.addEventListener('click', () => {
      let v = parseInt(qtyValue.textContent);
      qtyValue.textContent = v + 1;
    });
  }

  // --- Color selector on product detail ---
  document.querySelectorAll('.color-option').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // --- Newsletter subscribe ---
  document.querySelectorAll('.subscribe-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Berhasil subscribe newsletter!');
        input.value = '';
      }
    });
  });

  // --- Filter sidebar active state (product listing) ---
  document.querySelectorAll('.filter-category-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.filter-category-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- Smooth scroll for blog table of contents ---
  document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
