import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { CartContext } from './CartContext';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51PeYHMC0TmUVsMcnLGkGmCiwlDhktTOyfi2KA6jnjUneE3eGrGpfgTGU6r3T338MyJE5JpOFzA4bjj5YeQ3rS59z002uSUpuIO');

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (user) {
      setShippingInfo({
        name: user.name || '',
        address: user.address || '',
        city: user.city || '',
        zip: user.zip || '',
        country: user.country || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to your cart before proceeding.');
      return;
    }

    const { name, address, city, zip, country } = shippingInfo;
    if (!name || !address || !city || !zip || !country) {
      alert('Please fill out all the fields.');
      return;
    }

    // Create a payment method using Stripe
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/submit_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          userEmail: user.email,
          name,
          address,
          city,
          zip,
          country,
          paymentMethod: paymentMethod.id, // Send Stripe payment method ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await response.json();

      if (data.orderId && data.orderCode) {
        navigate('/order-confirmation', {
          state: {
            orderId: data.orderId,
            orderCode: data.orderCode,
          },
        });
      } else {
        throw new Error(data.error || 'Unexpected response structure');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error during checkout:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h3>Checkout</h3>
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="zip" className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={shippingInfo.country}
                onChange={handleChange}
                required
              />
            </div>

            <h4>Payment Information</h4>
            <div className="mb-3">
              <CardElement />
            </div>
            
            <button type="submit" className="btn btn-primary">Place Order</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">Quantity: {item.quantity}</small>
                </div>
                <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{calculateTotal()} dhs</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export default CheckoutPage;
