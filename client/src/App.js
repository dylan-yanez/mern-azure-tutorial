import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import Login from './Login';
import Playlists from './Playlists';
import Settings from './Settings';
import NewUser from './NewUser';
import SearchResult from './SearchResult';
import VideoPlayerPage from './VideoPlayerPage';
import LikedVideos from './LikedVideos';
import PlaylistSongs from './PlaylistSongs'; // Import the new PlaylistSongs component

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
            <Route path="/profile" element={<Login onSignUp={handleSignUp} />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/video/:videoId" element={<VideoPlayerPage />} />
            <Route path="/signup" element={<NewUser />} />
            <Route path="/likedsongs" element={<LikedVideos />} />
            <Route path="/playlist/:playlistId" element={<PlaylistSongs />} /> {/* New route for playlist songs */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
