import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Login.css';
import baseUrl from "./baseUrl"; // Import baseUrl

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Add successMessage state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is logged in
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${baseUrl}/checklogin`);
        const responseData = await response.text(); // Read response as text
        console.log('Response from checklogin:', responseData); // Log response data
        if (response.ok) {
          const data = await response.json();
          if (data.isLoggedIn) {
            navigate('/settings');
          }
        } else {
          throw new Error('Failed to check login status');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
  
    checkLoggedIn();
  }, [navigate]); // Include navigate in the dependency array
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/logindetails`, { // Use baseUrl for the login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userData = await response.json();
      console.log('User logged in successfully:', userData);
      setSuccessMessage('Successfully logged in!'); // Set success message
      setError(''); // Clear error message
      navigate('/settings'); // Redirect to settings on successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid username or password. Please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h2>Welcome Back!</h2>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
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
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </form>
        <p className="signup-link" onClick={handleSignUp}>Don't have an account? Sign up now!</p> 
      </div>
    </div>
  );
};

export default Login;
