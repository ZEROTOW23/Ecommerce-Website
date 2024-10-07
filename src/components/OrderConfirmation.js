import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FaCheckCircle } from 'react-icons/fa';  {/* Import the checkmark icon */}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const { orderId, orderCode } = location.state || {};

  if (!orderId || !orderCode) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '24px', color: '#333' }}>No order information available</h3>
      </div>
    );
  }

  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      textAlign: 'center', 
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      backgroundColor: '#f9f9f9',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <FaCheckCircle style={{ fontSize: '50px', color: '#28a745', marginBottom: '20px' }} />
      <h3 style={{ fontSize: '28px', color: '#333', marginBottom: '10px' }}>Order Confirmation</h3>
      <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>Thank you for your purchase!</p>
      <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
        Your order ID is <strong>{orderId}</strong> and your order code is <strong>{orderCode}</strong>.
      </p>
      <button 
        onClick={handleContinueShopping} 
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          color: '#fff', 
          backgroundColor: '#007bff', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={e => e.target.style.backgroundColor = '#007bff'}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;
