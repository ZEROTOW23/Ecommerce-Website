import React, { useEffect, useState } from 'react';

const ViewSupportMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_support_messages.php');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching support messages:', error);
        setError('Failed to fetch support messages. Please try again later.');
      }
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="container mt-5">
      <h3>Support Messages</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {messages.length === 0 ? (
          <li className="list-group-item">No support messages available.</li>
        ) : (
          messages.map((message) => (
            <li key={message.id} className="list-group-item">
              <strong>Name:</strong> {message.name}<br />
              <strong>Email:</strong> {message.email}<br />
              <strong>Message:</strong> {message.message}<br />
              <small>Received at: {new Date(message.created_at).toLocaleString()}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewSupportMessages;
