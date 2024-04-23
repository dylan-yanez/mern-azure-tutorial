import React, { useState, useEffect } from 'react';
import './Playlists.css';
import PlaylistForm from './PlaylistForm'; // Import the PlaylistForm component

const Playlists = () => {
  // State for storing playlist data
  const [playlists, setPlaylists] = useState([]);
  // State to track if playlists are empty
  const [isEmpty, setIsEmpty] = useState(true); // Initially set to true to show only create form
  // State to track whether to show the playlist form
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  // Fetch playlist data from API (or initial data loading)
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Simulate fetching playlist data from API
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        const fetchedPlaylists = data.playlists || []; // Default to empty array if no playlists
        setPlaylists(fetchedPlaylists);
        setIsEmpty(fetchedPlaylists.length === 0);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  // Function to handle creating a new playlist
  const handleCreatePlaylist = (playlistData) => {
    // Add new playlist
    const newPlaylist = {
      id: playlists.length + 1, // Assign a unique ID
      name: playlistData.name,
      image: playlistData.image,
      description: playlistData.description,
      songs: playlistData.songs // Assuming the playlist data includes songs
      // Add any additional properties as needed
    };
    // Append the new playlist to the existing playlists
    setPlaylists([...playlists, newPlaylist]);
    setIsEmpty(false); // Update isEmpty state
    setShowPlaylistForm(false); // Hide playlist form
  };

  return (
    <div className="playlists-wrapper">
      {/* Conditionally render Create Playlist or Cancel button */}
      {showPlaylistForm ? (
        <div className="create-playlist-container">
          <button onClick={() => setShowPlaylistForm(false)}>Cancel</button>
        </div>
      ) : (
        <div className="create-playlist-container">
          <button onClick={() => setShowPlaylistForm(true)}>Create Playlist</button>
        </div>
      )}
      {/* Conditionally render PlaylistForm or playlist container */}
      {showPlaylistForm ? (
        <PlaylistForm onCreatePlaylist={handleCreatePlaylist} onFormClose={() => setShowPlaylistForm(false)} />
      ) : (
        <div className="centered-box">
          {/* Only render playlists if not empty */}
          {!isEmpty && (
            <div className="playlist-container">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-item">
                  <img src={playlist.image} alt={playlist.name} />
                  <h3>{playlist.name}</h3>
                  {/* Add additional playlist information and interactions here */}
                </div>
              ))}
            </div>
          )}
          {/* Show message if playlists are empty */}
          {isEmpty && <div className="empty-playlist">No playlists available</div>}
        </div>
      )}
    </div>
  );
};

export default Playlists;
