import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // eslint-disable-next-line
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // Get the history object
  
  const fetchData = async () => {
    try {
      setError('');
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Login Response Data:', data);
        // Store token in local storage
        localStorage.setItem('carttoken', data.token);
        setMessage('Login Successful');
        setUserDetails(null);
        localStorage.setItem('carttoken', 'sdsd');
        navigate('/');
      } else {
        setError(`Failed to login. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="full-container">
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={fetchData}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <div className="register-link-container">
          <Link to="/register" className="register-link">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
