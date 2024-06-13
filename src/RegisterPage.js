import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError('');
      const response = await axios.post('http://localhost:8080/new', {
       userName: username,
        password,
       emailId: email,
       role:"USER"
      });

      if (response.status === 200) {
        setMessage('Registration Successful');
        setUsername('');
        setPassword('');
        setEmail('');
        navigate('/login');
      } else {
        setError(`Failed to register. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error registering:', error.message);
      setError('Registration failed. Please check your inputs.');
    }
  };

  return (
    <div className="full-container">
      <div className="register-container">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
