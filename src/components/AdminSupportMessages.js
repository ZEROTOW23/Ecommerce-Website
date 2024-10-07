import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSupportMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost/ecommerce-site/src/Backend/get_support_messages.php');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages. Please try again later.');
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Support Messages</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {messages.map(message => (
          <div key={message.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">From: {message.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Email: {message.email}</h6>
                <p className="card-text">Message: {message.message}</p>
                <p className="card-text"><small className="text-muted">Received at: {new Date(message.created_at).toLocaleString()}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSupportMessages;
