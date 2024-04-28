import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const SessionInfoComponent = () => {
    // State to store the session userId
    const [userId, setUserId] = useState(null);
  
    // Function to fetch session info from the server
    const fetchSessionInfo = async () => {
      try {
        // Make a GET request to the server API route
        const response = await axios.get(`${baseUrl}/api/sessionInfo`);
  
        // Set the userId state based on the response data
        setUserId(response.data.userId);
        console.log(response.data.userId)
      } catch (error) {
        console.error('Error fetching session info:', error);
      }
    };
  
    // useEffect hook to fetch session info when the component mounts
    useEffect(() => {
      fetchSessionInfo();
    }, []);
  
    return (
      <div>
        <p>User Type: {userId === undefined ? 'Free Listener :)' : 'TuneVista Member :)'}</p>
      </div>
    );
  };
  
  export default SessionInfoComponent;  