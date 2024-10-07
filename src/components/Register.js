import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register.css'; // Import the CSS file
import logo from '../images/Logo.png';

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword state
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password validation
    if (credentials.password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    // Confirm password validation
    if (credentials.password !== credentials.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    console.log('Submitting credentials:', credentials); // Log credentials
    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      console.log('Response:', data); // Log response
      if (response.ok) {
        setMessage('User registered successfully');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Error registering user');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
      <img src={logo} alt="Shop Logo" style={{ height: '50px', marginRight: '10px' }} />
        <h2>Register</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
