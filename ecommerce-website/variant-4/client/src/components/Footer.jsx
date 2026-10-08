import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3><i className="fas fa-bag-shopping"></i> ShopEase</h3>
            <p>Your one-stop shop for quality products. Built as a full-stack portfolio project.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="/products">All Products</a>
            <a href="/products?category=Electronics">Electronics</a>
            <a href="/products?category=Fashion">Fashion</a>
            <a href="/products?category=Home">Home</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Contact Us</a>
            <a href="#">Shipping Info</a>
            <a href="#">Returns</a>
            <a href="#">FAQ</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopEase. Demo e-commerce project.</p>
        </div>
      </div>
    </footer>
  );
}
