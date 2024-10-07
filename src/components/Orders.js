import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showHistory, setShowHistory] = useState(false);
    const ordersPerPage = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const endpoint = showHistory ? 'get_order_history.php' : 'get_orders_client.php';
                const response = await fetch(`http://localhost/ecommerce-site/src/Backend/${endpoint}`);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && Array.isArray(data)) {
                    setOrders(data);
                    setFilteredOrders(data);
                } else {
                    setError('No orders found.');
                }
            } catch (error) {
                setError(`Failed to fetch orders: ${error.message}`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [showHistory]);

    useEffect(() => {
        setFilteredOrders(
            orders.filter((order) =>
                order.user_email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset to the first page on search
    }, [searchTerm, orders]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const toggleOrderStatus = async (orderId, currentStatus) => {
        const newStatus = currentStatus === 'Shipped' ? 'Pending' : 'Shipped';
        try {
            const response = await fetch(`http://localhost/ecommerce-site/src/Backend/mark_as_shipped.php?order_id=${orderId}&status=${newStatus}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                alert(`Order status changed to ${newStatus}.`);

                const adminDashboard = window.opener;
                if (adminDashboard) {
                    adminDashboard.updateTotalSales();
                    adminDashboard.updateTotalMoney();
                }

                setShowHistory(!showHistory); // Refresh to show new orders or history based on the toggle
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            alert(`Failed to change order status: ${error.message}`);
            console.error(error);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Orders</h4>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by email"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        className={`btn ${showHistory ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        {showHistory ? 'Show New Orders' : 'Show Order History'}
                    </button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr className="table-dark">
                                    <th>Order ID</th>
                                    <th>Name Client</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Created_at</th>
                                    {!showHistory && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.user_email}</td>
                                        <td>{order.address}</td>
                                        <td>{order.price}</td>
                                        <td>
                                            {order.status === 'Shipped' ? (
                                                <span className="badge bg-success">Shipped</span>
                                            ) : (
                                                <span className="badge bg-warning">Pending</span>
                                            )}
                                        </td>
                                        <td>{new Date(order.created_at).toLocaleString()}</td>
                                        {!showHistory && (
                                            <td>
                                                <button
                                                    className={`btn ${order.status === 'Shipped' ? 'btn-warning' : 'btn-primary'}`}
                                                    onClick={() => toggleOrderStatus(order.order_id, order.status)}
                                                >
                                                    {order.status === 'Shipped' ? 'Mark as Pending' : 'Mark as Shipped'}
                                                    <FontAwesomeIcon icon={faTruck} className="ms-2" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Orders;
