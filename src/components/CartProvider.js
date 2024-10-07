
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import AuthProvider from './AuthContext';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Switch>
            <Route path="/cart" component={Cart} />
            {/* Define other routes */}
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
