import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './components/AuthContext';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Home from './components/home';
import Login from './components/login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import AdminDashboard from './components/AdminDashboard';
import UploadProduct from './components/UploadProduct';
import Contact from './components/Contact';
import ViewSupportMessages from './components/ViewSupportMessages';
import ProductManagement from './components/ProductManagement';
import EditProduct from './components/EditProduct'; 
import ProtectedRoute from './components/ProtectedRoute';
import LoginAdmin from './components/loginadmin';
import Account from './components/Account';
import { CartProvider } from './components/CartContext';
import UserManagement from './components/UserManagement';
import Orders from './components/Orders';


const App = () => {
  const { user, loading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<><Header /><Home addToCart={addToCart} /></>} />
          <Route path="/login" element={<><Header /><Login /></>} />
          <Route path="/register" element={<><Header /><Register /></>} />
          <Route path="/home" element={<><Header /><Home addToCart={addToCart} /></>} />
          <Route path="/product/:id" element={<><Header /><ProductDetails addToCart={addToCart} /></>} />
          <Route path="/cart" element={<><Header /><Cart cartItems={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /></>} />
          <Route path="/checkout" element={<><Header /><Checkout cartItems={cart} /></>} />
          <Route path="/contacts" element={<><Header /><Contact /></>} />
          <Route path="/order-confirmation" element={<><Header /><OrderConfirmation /></>} />

          

          {/* Protected client route */}
          <Route
            path="/account"
            element={
              <ProtectedRoute role="client">
                <><Header /><Account /></>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              !user || user.role !== 'admin' ? (
                <Navigate to="/loginadmin" />
              ) : (
                <><AdminHeader /><AdminDashboard /></>
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <><AdminHeader /><Orders /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/uploadProduct"
            element={
              <ProtectedRoute role="admin">
                <><AdminHeader /><UploadProduct /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute role="admin">
                <><AdminHeader /><ViewSupportMessages /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ProductManagement"
            element={
              <ProtectedRoute role="admin">
                <><AdminHeader /><ProductManagement /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/EditProduct/:id"
            element={
              <ProtectedRoute role="admin">
                <><AdminHeader /><EditProduct /></>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/Users"
            element={
              <ProtectedRoute role="admin">
                <><AdminHeader /><UserManagement /></>
              </ProtectedRoute>
            }
          />

          {/* Admin Login Route */}
          <Route path="/loginadmin" element={<><Header /><LoginAdmin /></>} />

          {/* Default redirection based on user authentication */}
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
