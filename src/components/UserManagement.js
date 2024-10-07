import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost/ecommerce-site/src/Backend/get_users.php');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users: ' + error.message);
        setLoading(false);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const updateUserStatus = async (userId, status) => {
    try {
      await axios.post('http://localhost/ecommerce-site/src/Backend/update_user_status.php', new URLSearchParams({
        user_id: userId,
        status
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.post('http://localhost/ecommerce-site/src/Backend/delete_user.php', new URLSearchParams({
        user_id: userId
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>User Management</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'blocked' : 'active')}
                      className={`btn ${user.status === 'active' ? 'btn-danger' : 'btn-success'} me-3`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
