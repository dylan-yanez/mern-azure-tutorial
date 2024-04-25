import React, { useState } from 'react';
import './NewUser.css'; // Import the CSS file for styling
import baseUrl from "./baseUrl";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${baseUrl}/signupdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage('');
        return;
      }
  
      const newUser = await response.json();
      console.log('User signed up successfully:', newUser);
      setSuccessMessage('User signed up successfully!');
      setErrorMessage('');
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/profile'); // Redirect to the login page
      }, 2000);
      
    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage('Internal server error');
      setSuccessMessage('');
    }
  };

  return (
    <div className='new-user-wrapper'>
      <div className="new-user-container">
        <h2>Create New Account</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
