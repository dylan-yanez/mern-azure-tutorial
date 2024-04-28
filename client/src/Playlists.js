import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import './Playlists.css';
import PlaylistForm from './PlaylistForm';
import DeletePlaylistButton from './DeletePlaylistButton';
import baseUrl from './baseUrl';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/playlists`);
        setPlaylists(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();

    // Check login status
    const checkLoginStatus = async () => {
      try {
        const response = await axios.post(`${baseUrl}/checklogin`);
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleCreatePlaylist = async (playlistData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/playlists`, playlistData);
      const newPlaylist = response.data;
      setPlaylists([...playlists, newPlaylist]);
      setIsEmpty(false);
      setShowPlaylistForm(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleDeletePlaylist = (deletedPlaylistId) => {
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== deletedPlaylistId);
    setPlaylists(updatedPlaylists);
  };

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="playlists-wrapper">
      {showPlaylistForm ? (
        <div className="create-playlist-container">
          <button onClick={() => setShowPlaylistForm(false)}>Cancel</button>
        </div>
      ) : (
        <div className="create-playlist-container">
          <button onClick={() => setShowPlaylistForm(true)}>Create Playlist</button>
        </div>
      )}
      {showPlaylistForm ? (
        <PlaylistForm onCreatePlaylist={handleCreatePlaylist} onFormClose={() => setShowPlaylistForm(false)} />
      ) : (
        <div className="centered-box">
          {!isEmpty && (
            <div className="playlist-container">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-item">
                  <Link
                    to={`/playlist/${playlist.id}`} // Redirect to playlist page
                    className="playlist-link"
                  >
                    <img src="https://i.ytimg.com/vi/NaZeslUINF4/mqdefault.jpg" alt={playlist.name} />
                    <h3>{playlist.name}</h3>
                  </Link>
                  <DeletePlaylistButton playlistId={playlist.id} onDelete={handleDeletePlaylist} />
                </div>
              ))}
            </div>
          )}
          {isEmpty && <div className="empty-playlist">No playlists available</div>}
        </div>
      )}
    </div>
  );
};

export default Playlists;
