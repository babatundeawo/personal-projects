import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { RequireAuth, RequireAdmin } from './components/RouteGuards.jsx';

import Home from './pages/Home.jsx';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductListing />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="/order-confirmation/:id" element={<RequireAuth><OrderConfirmation /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><OrderHistory /></RequireAuth>} />
        <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">
        <p>Fieldstone — a demo storefront built with React, Node.js, Express &amp; MongoDB</p>
      </footer>
    </>
  );
}
