import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import StarRating from '../components/StarRating.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetails() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  function load() {
    setLoading(true);
    productService
      .get(slug)
      .then((data) => {
        setProduct(data.product);
        setRelated(data.related);
        setQty(1);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }

  useEffect(load, [slug]);

  async function submitReview(e) {
    e.preventDefault();
    setReviewError('');
    if (!reviewComment.trim()) {
      setReviewError('Write a short comment before submitting.');
      return;
    }
    setReviewSubmitting(true);
    try {
      await productService.addReview(slug, { rating: reviewRating, comment: reviewComment.trim() });
      setReviewComment('');
      load();
    } catch (err) {
      setReviewError(err.message);
    } finally {
      setReviewSubmitting(false);
    }
  }

  if (loading) return <p className="loading-block">Loading product…</p>;
  if (notFound || !product) return <p className="empty-note">Product not found.</p>;

  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="page">
      <div className="product-detail">
        <div className="detail-media">{product.name.slice(0, 1)}</div>
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} count={product.numReviews} />
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>

          <p className={`detail-stock ${lowStock ? 'low' : ''}`}>
            {product.stock === 0
              ? 'Out of stock'
              : lowStock
              ? `Only ${product.stock} left in stock`
              : 'In stock'}
          </p>

          {product.stock > 0 && (
            <>
              <div className="qty-row">
                <div className="qty-control">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="action-row">
                <button className="btn btn-primary" onClick={() => addItem(product, qty)}>
                  Add to cart
                </button>
                <Link to="/cart" className="btn btn-outline">View cart</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <section className="reviews">
        <h2 style={{ fontSize: '1.3rem', marginBottom: 18 }}>Reviews ({product.numReviews})</h2>

        {product.reviews.length === 0 && <p style={{ color: 'var(--ink-dim)' }}>No reviews yet.</p>}
        {product.reviews.map((r) => (
          <div className="review" key={r._id}>
            <div className="review-head">
              <span className="review-name">{r.name}</span>
              <span className="review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p style={{ color: 'var(--ink-dim)', fontSize: '.9rem' }}>{r.comment}</p>
          </div>
        ))}

        {user ? (
          <form onSubmit={submitReview} style={{ marginTop: 24, maxWidth: 420 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Write a review</h3>
            {reviewError && <p className="form-error">{reviewError}</p>}
            <div className="field">
              <label>Rating</label>
              <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Comment</label>
              <textarea rows={3} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
            </div>
            <button className="btn btn-primary" disabled={reviewSubmitting}>
              {reviewSubmitting ? 'Submitting…' : 'Submit review'}
            </button>
          </form>
        ) : (
          <p style={{ marginTop: 16, fontSize: '.88rem' }}>
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Log in</Link> to leave a review.
          </p>
        )}
      </section>

      {related.length > 0 && (
        <section className="related-strip">
          <h2 style={{ fontSize: '1.3rem', marginBottom: 18 }}>You might also like</h2>
          <div className="product-grid" style={{ padding: 0 }}>
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
