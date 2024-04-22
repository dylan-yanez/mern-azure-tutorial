import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Perform account validation here
    const isValid = validateAccount(username, password);
    if (isValid) {
      setError('');
      onLogin(username, password);
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  const validateAccount = (username, password) => {
    // Implement your account validation logic here
    // For example, you can check if the username and password match an existing account in your system
    // You might make an API call to your backend to validate the credentials
    // For demonstration purposes, let's assume a simple validation where username is 'user' and password is 'password'
    return username === 'user' && password === 'password';
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="signup-link" onClick={onSignUp}>Don't have an account? Sign up now!</p> 
      </div>
    </div>
  );
};

export default Login;
