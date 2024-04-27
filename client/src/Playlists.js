import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Playlists.css';
import PlaylistForm from './PlaylistForm';
import DeletePlaylistButton from './DeletePlaylistButton'; // Import the new button component
import baseUrl from './baseUrl';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

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
    // Filter out the deleted playlist from the playlists array
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== deletedPlaylistId);
    setPlaylists(updatedPlaylists);
  };

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
                    to={`/playlist/${playlist.id}`} // Navigate to playlist songs component
                    className="playlist-link"
                  >
                    <img src="https://i.ytimg.com/an_webp/NaZeslUINF4/mqdefault_6s.webp?du=3000&sqp=CLrZsrEG&rs=AOn4CLAHRCDiKt1V9xN7eJggalIzXWDDJA" alt={playlist.name} />
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
