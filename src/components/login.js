import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import '../login.css'; 
import logo from '../images/Logo.png';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        login(data.user);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');  // Navigate to home page for non-admin users
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to authenticate');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo}  style={{ height: '50px', marginRight: '10px' }} />
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="register-link">
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
