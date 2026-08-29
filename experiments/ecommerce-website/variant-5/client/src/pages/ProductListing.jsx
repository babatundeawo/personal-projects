import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService.js';
import { wishlistService } from '../services/wishlistService.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';

export default function ProductListing() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], page: 1, pages: 1, categories: [] });
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || '-createdAt';

  useEffect(() => {
    setLoading(true);
    productService
      .list({ search, category, page, sort })
      .then(setData)
      .finally(() => setLoading(false));
  }, [search, category, page, sort]);

  useEffect(() => {
    if (user) wishlistService.get().then((d) => setWishlist(d.wishlist.map((p) => p._id)));
  }, [user]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value === undefined || value === '' || value === 'all') next.delete(key);
    else next.set(key, value);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  }

  async function handleToggleWishlist(productId) {
    const d = await wishlistService.toggle(productId);
    setWishlist(d.wishlist.map((id) => (typeof id === 'string' ? id : id._id || id)));
  }

  return (
    <div className="page">
      <div className="section-heading" style={{ margin: '0 0 20px' }}>
        <h2>{search ? `Results for "${search}"` : 'Shop all'}</h2>
        <select value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
          <option value="-createdAt">Newest</option>
          <option value="price">Price: low to high</option>
          <option value="-price">Price: high to low</option>
          <option value="-rating">Top rated</option>
        </select>
      </div>

      <div className="category-strip" style={{ padding: '0 0 30px' }}>
        <button
          className={`category-pill ${category === 'all' ? 'active' : ''}`}
          onClick={() => updateParam('category', 'all')}
        >
          All
        </button>
        {data.categories.map((c) => (
          <button
            key={c}
            className={`category-pill ${category === c ? 'active' : ''}`}
            onClick={() => updateParam('category', c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-block">Loading products…</p>
      ) : data.products.length === 0 ? (
        <p className="empty-note">No products match your search — try a different term or category.</p>
      ) : (
        <>
          <div className="product-grid">
            {data.products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                isWishlisted={wishlist.includes(p._id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
          <Pagination page={data.page} pages={data.pages} onChange={(n) => updateParam('page', n)} />
        </>
      )}
    </div>
  );
}
