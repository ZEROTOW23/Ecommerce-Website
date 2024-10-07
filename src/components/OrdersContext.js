import React, { createContext, useState, useContext, useEffect } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
    return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_orders.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost/ecommerce-site/src/Backend/mark_as_shipped.php?order_id=${orderId}&status=${newStatus}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.order_id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Failed to change order status:', error);
        }
    };

    return (
        <OrdersContext.Provider value={{ orders, loading, updateOrderStatus }}>
            {children}
        </OrdersContext.Provider>
    );
};
