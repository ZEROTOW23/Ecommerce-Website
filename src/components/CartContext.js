import React, { createContext, useState } from 'react';

// Create the CartContext
export const CartContext = createContext();

// CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
      setCartItems(updatedCart);
    } else {
      // Add the new item to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity to less than 1

    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
