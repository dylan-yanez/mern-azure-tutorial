import React, { useState, useEffect } from 'react';
import './Playlists.css';

const Playlists = () => {
  // State for storing playlist data
  const [playlists, setPlaylists] = useState([]);
  // State to track if playlists are empty
  const [isEmpty, setIsEmpty] = useState(false);

  // Fetch playlist data from API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Simulate fetching playlist data from API
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        const fetchedPlaylists = data.playlists; // Assuming playlist data is an array of playlists
        setPlaylists(fetchedPlaylists);
        setIsEmpty(fetchedPlaylists.length === 0);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  // Function to handle creating a new playlist
  const handleCreatePlaylist = () => {
    const playlistName = window.prompt('Enter the name of the playlist:');
    if (playlistName) {
      const newPlaylist = {
        id: playlists.length + 1, // Assign a unique ID
        name: playlistName,
        // Add any additional properties as needed
      };
      setPlaylists([...playlists, newPlaylist]);
      setIsEmpty(false); // Update isEmpty state
    }
  };

  return (
    <div className="playlists-wrapper">
      <div className="create-playlist-container">
          <button className="create-playlist-button" onClick={handleCreatePlaylist}>
            Create Playlist
          </button>
        </div>
      <div className="centered-box">
        
        <div className="playlist-container">
          {isEmpty ? (
            <div className="empty-playlist">No playlists available</div>
          ) : (
            playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <img src={playlist.imageUrl} alt={playlist.name} />
                <h3>{playlist.name}</h3>
                {/* Add additional playlist information and interactions here */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
