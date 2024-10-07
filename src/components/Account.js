import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Account = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost/ecommerce-site/src/Backend/get_user_orders.php?email=${user.email}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data.orders || []);
            } catch (error) {
                setError('Failed to fetch orders.');
                console.error('Failed to fetch orders:', error);
            }
        };

        const fetchOrderHistory = async () => {
            try {
                const response = await fetch(`http://localhost/ecommerce-site/src/Backend/get_order_history.php?email=${user.email}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOrderHistory(data.orders || []);
            } catch (error) {
                setError('Failed to fetch order history.');
                console.error('Failed to fetch order history:', error);
            }
        };

        fetchOrders();
        fetchOrderHistory();
    }, [user.email]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!email || !email.includes('@')) {
            setMessage('Invalid email format.');
            return;
        }

        const data = {
            email: user.email,
            newEmail: email,
            newPassword: password
        };

        try {
            const response = await fetch('http://localhost/ecommerce-site/src/Backend/update_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log('Response Data:', responseData);

            if (responseData.success) {
                if (data.newEmail) {
                    console.log('Updating user:', { ...user, email: data.newEmail });
                    updateUser({ ...user, email: data.newEmail });
                }
                setMessage('Account updated successfully.');
            } else {
                setMessage(responseData.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Account Menu</h5>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link to="/account" className="text-decoration-none">Account Details</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/change-password" className="text-decoration-none">Change Password</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <h2 className="mb-4">Account Settings</h2>
                    {message && <div className="alert alert-info">{message}</div>}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">Account Details</h4>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update Account Information</h4>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">New Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <small className="form-text text-muted">Leave blank if you do not want to change the password.</small>
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h4 className="card-title">Your Orders</h4>
                            {orders.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr className="table-dark">
                                                <th>Order Id</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                          
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.order_id}>
                                                    <td>{order.order_id}</td>
                                                    <td>{order.product_name}</td>
                                                    <td>{order.price} dhs</td>
                                                    <td>
                                                        {order.shipped ? (
                                                            <span className="badge bg-warning">Pending</span>
                                                        ) : (
                                                            <span className="badge bg-warning">Pending</span>
                                                        )}
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>All products have been shipped.</p>
                            )}
                        </div>
                    </div>

                    <div className="card mt-4">
    <div className="card-body">
        <h4 className="card-title">Order History</h4>
        {orderHistory.length > 0 ? (
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr className="table-dark">
                            <th>Order Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.product_name}</td>
                                <td>{order.price} dhs</td>
                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p>No order history found.</p>
        )}
    </div>
</div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Account;
