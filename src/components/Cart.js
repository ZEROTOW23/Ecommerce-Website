import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import Footer from './Footer';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <div className="container mt-5">
          <h3>Shopping Cart</h3>
          <p>Your cart is empty</p>
        </div>
        <Footer style={{ width: '100%', padding: '10px 0 0 0' }} />
      </div>
    );
  }

  // Group cart items by product id and collect sizes
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, sizes: [] };
    }
    if (!acc[item.id].sizes.includes(item.size)) {
      acc[item.id].sizes.push(item.size);
    }
    return acc;
  }, {});

  return (
    <div>
      <div className="container mt-5">
        <h3 className="mb-4">Shopping Cart</h3>
        <div className="row">
          {Object.values(groupedItems).map(item => (
            <div key={item.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost/ecommerce-site/src/Backend/uploads/${item.photo}`}
                      className="img-fluid rounded-start"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">Price: {item.price}dhs</p>
                      <p className="card-text">Sizes: {item.sizes.join(' | ')}</p> 
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="btn btn-light">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/Checkout" className="btn btn-primary btn-lg mt-3">
            Proceed to Checkout
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Cart;
