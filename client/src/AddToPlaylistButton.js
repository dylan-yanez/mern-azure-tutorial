import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const AddToPlaylistButton = ({ songId, songTitle }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/playlists`);
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleAddToPlaylist = async (playlistId) => {
    try {
      // Call the endpoint to add the song to the selected playlist
      await axios.post(`${baseUrl}/api/playlists/${playlistId}/songs`, {
        songId,
        songTitle
      });
      // Close the popup/modal after adding the song
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Add to Playlist</button>
      {showPopup && (
        <div>
          <h2>Select a Playlist</h2>
          {loading ? (
            <p>Loading...</p>
          ) : playlists.length === 0 ? (
            <p>No playlists exist</p>
          ) : (
            <ul>
              {playlists.map(playlist => (
                <button key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id)}>
                  {playlist.name}
                </button>
              ))}
            </ul>
          )}
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylistButton;
