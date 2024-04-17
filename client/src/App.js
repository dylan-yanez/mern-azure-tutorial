// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import Login from './Login';
import Playlists from './Playlists';
import Settings from './Settings';
import NewUser from './NewUser';
import SearchResult from './SearchResult';
import PopularTikTokSongs from './PopularTikTokSongs'; // Import the new component
import PopularSlowedAndReverbSongs from './PopularSlowedAndReverbSongs'; // Import the new component

const App = () => {
  const [showNewUser, setShowNewUser] = useState(false);

  const handleSignUp = () => {
    setShowNewUser(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/tiktok-songs" element={<PopularTikTokSongs />} /> {/* Route for TikTok songs */}
            <Route path="/slowed-and-reverb-songs" element={<PopularSlowedAndReverbSongs />} /> {/* Route for Slowed and Reverb songs */}
            <Route path="/profile" element={<Login onSignUp={handleSignUp} />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
