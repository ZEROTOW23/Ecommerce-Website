import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import '../login.css'; 

const LoginAdmin = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/ecommerce-site/src/Backend/loginadmin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        login(data.user);
        navigate('/admin');
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
        <h2>Admin Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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

export default LoginAdmin;
