import React from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import LogoutButton from './LogoutButton';

const Settings = () => {
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
          <section className="main-section">
            <h2 className="section-heading">Your Settings will be displayed here!</h2>
            <p className="section-text">Explore a vast collection of songs from various genres. Create playlists, save your favorite tracks, and enjoy a seamless music listening experience.</p>
            <Link to="/profile">
              <button className="cta-button">Get Started</button>
            </Link>
            <LogoutButton />
          </section>
        </main>
        <footer>
          <p className="footer-text">&copy; 2024 TuneVista. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Settings;
