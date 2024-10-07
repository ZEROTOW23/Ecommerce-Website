import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCartItems(user.email);
        }
    }, [user]);

    const fetchCartItems = async (email) => {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_cart_items.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setCartItems(data.cartItems || []);
    };

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setCartItems([]);
    };

    const updateUser = async (updatedData) => {
        // Implement the logic to update user data, e.g., via an API call
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/update_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, ...updatedData }),
        });

        const result = await response.json();
        if (result.success) {
            setUser((prevUser) => ({
                ...prevUser,
                ...updatedData,
            }));
        } else {
            throw new Error(result.message || 'Failed to update user.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, cartItems, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
