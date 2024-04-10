import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Home.css'; // css file for styling

import SearchTool from './SearchTool';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1 className="title">Welcome to TuneVista</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/library">Library</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/playlist">Playlists</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/account">Account</Link></li> {/* Use Link instead of <a> */}
          </ul>
        </nav>
        <Fragment>
          <SearchTool />
        </Fragment>
      </header>
      <main>
        <section className="main-section">
          <h2 className="section-heading">Discover and Enjoy Music</h2>
          <p className="section-text">Explore a vast collection of songs from various genres. Create playlists, save your favorite tracks, and enjoy a seamless music listening experience.</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>
      <footer>
        <p className="footer-text">&copy; 2024 TuneVista. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;