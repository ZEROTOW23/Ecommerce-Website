// src/components/Header.js

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import { CartContext } from './CartContext';
import logo from '../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');

    // Calculate the total price of items in the cart
    const totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            // Redirect to the search results page with the query parameter
            window.location.href = `/productsearch?query=${encodeURIComponent(searchQuery)}`;
        }
    };

    // Define a common style for icons with the gold color
    const iconStyle = { color: '#d4af37' }; // Gold color from the logo

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Shop Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <span>Shop</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact-form">Contacts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#About Us">About Us</a> {/* Link to About Us section */}
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user && user.role === 'client' && (
                            <>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to="/account" aria-label="Account">
                                        <FontAwesomeIcon icon={faUser} size="xl" style={iconStyle} />
                                    </Link>
                                </li>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to="/cart" aria-label="Cart">
                                        <FontAwesomeIcon icon={faCartShopping} size="xl" style={iconStyle} />
                                        {cartItems.length > 0 && (
                                            <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ fontWeight: 'bold' }}>{totalCartPrice} dhs</span>
                                </li>
                            </>
                        )}
                        {user ? (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={logout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} /> <span className="nav-text">Logout</span>
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" aria-label="Login">
                                        <FontAwesomeIcon icon={faSignInAlt} style={iconStyle} /> <span className="nav-text">Login</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register" aria-label="Register">
                                        <FontAwesomeIcon icon={faUserPlus} style={iconStyle} /> <span className="nav-text">Register</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
