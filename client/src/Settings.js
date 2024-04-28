import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import LogoutButton from './LogoutButton';
import AdminView from './AdminView'; // Import AdminView component
import axios from 'axios'; // Import axios for fetching user data
import baseUrl from "./baseUrl"; // Import baseUrl

const Settings = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is an admin
    const checkAdmin = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/checkadmin`); // Adjust endpoint with baseUrl
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdmin();
  }, []);

  return (
    <div className="image-wrapper">
      <div className="home-container">
        <header>
          <h1 className="title">Welcome to TuneVista</h1>
          <nav>
            <ul className="nav-links"></ul>
          </nav>
        </header>
        <main>
          {isAdmin ? (
            <AdminView /> // Render AdminView component if user is admin
          ) : (
            <section className="main-section">
              <h2 className="section-heading">Your Settings will be displayed here!</h2>
              <p className="section-text">Explore a vast collection of songs from various genres. Create playlists, save your favorite tracks, and enjoy a seamless music listening experience.</p>
              <Link to="/profile">
                <button className="cta-button">Get Started</button>
              </Link>
            </section>
          )}
          <LogoutButton /> {/* Render LogoutButton for both regular users and admins */}
        </main>
        <footer>
          <p className="footer-text">&copy; 2024 TuneVista. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Settings;
