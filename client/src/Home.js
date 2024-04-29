import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './Home.css'; // css file for styling
import SearchTool from './SearchTool';
import PopularTikTokSongs from './PopularTikTokSongs';
import OneheartSection from './OneheartSection';
import SlowedAndReverb from './SlowedAndReverb';
import MashupMusic from './MashupMusic';
import MoodMelodies from './MoodMelodies';
import baseUrl from "./baseUrl"; // Import baseUrl

const Home = () => {
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

  return (
    <div className="image-wrapper">
      <div className="home-container">
        <header>
          <h1 className="title">Welcome to TuneVista</h1>
          <nav>
            <ul className="nav-links">
              {/* Add navigation links if needed */}
            </ul>
          </nav>
          <Fragment>
            <SearchTool />
          </Fragment>
        </header>
        <main>
          {/* Conditionally render the main section based on login status */}
          {!isLoggedIn && (
            <section className="main-section">
              <h2 className="section-heading">Discover and Enjoy Music!</h2>
              <p className="section-text">Explore a vast collection of songs from various genres. Create playlists, save your favorite tracks, and enjoy a seamless music listening experience.</p>
              <Link to="/profile"><button className="cta-button">Get Started</button></Link>
            </section>
          )}

          {/* Popular TikTok Songs Section */}
          <section className="popular-tiktok-songs">
            <h2 style={{ color: 'white' }}>Mashup Music</h2>
            <MashupMusic />
          </section>
          <section className="popular-tiktok-songs">
            <h2 style={{ color: 'white' }}>Slowed and Reverb</h2>
            <SlowedAndReverb />
          </section>
          <section className="popular-tiktok-songs">
            <h2 style={{ color: 'white' }}>Mood Melodies</h2>
            <MoodMelodies />
          </section>
          <section className="popular-tiktok-songs">
            <h2 style={{ color: 'white' }}>Best of Oneheart and others</h2>
            <OneheartSection />
          </section>
          <section className="popular-tiktok-songs">
            <h2 style={{ color: 'white' }}>Belgium's biggest star Damso (FR)</h2>
            <PopularTikTokSongs />
          </section>
          
        </main>
        <footer>
          <p className="footer-text">&copy; 2024 TuneVista. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
