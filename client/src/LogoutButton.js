import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.post(`${baseUrl}/checklogin`);
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`);
      setIsLoggedIn(false); // Update the state to reflect logout
      // Perform any additional actions after logout if needed
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <span style={{ color: 'red' }}>Not logged in</span>
      )}
    </div>
  );
};

export default LogoutButton;