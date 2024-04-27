import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './PlaylistSongs.css'; // Import CSS file for styling
import baseUrl from "./baseUrl";

const PlaylistSongs = () => {
  const { playlistId } = useParams();
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/playlists/${playlistId}/songs`);
        console.log('API Response:', response.data); // Log API response
        setPlaylistSongs(response.data.songs);
      } catch (error) {
        console.error('Error fetching playlist songs:', error);
      }
    };

    fetchPlaylistSongs();
  }, [playlistId]);

  const handleDeleteSong = async (songId) => {
    try {
      await axios.delete(`${baseUrl}/api/playlists/${playlistId}/songs/${songId}`);
      // Remove the deleted song from the playlistSongs state
      setPlaylistSongs(prevSongs => prevSongs.filter(song => song.song_id !== songId));
    } catch (error) {
      console.error('Error deleting song from playlist:', error);
    }
  };

  return (
    <div className="playlist-songs-container">
      <h2 className="section-heading">Playlist Songs</h2>
      <div className="song-grid">
        {playlistSongs.map((song) => (
          <div key={song.id} className="song-card">
            <Link
              to={`/video/${song.song_id}?title=${encodeURIComponent(song.song_name)}&thumbnail=${encodeURIComponent(`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`)}`}
              className="song-link"
            >
              <img
                src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`} // Render the thumbnail
                alt={song.song_name} // Use song name as alt text
                className="song-thumbnail"
              />
              <div className="song-info">
                <h3 className="song-title">{song.song_name}</h3>
              </div>
            </Link>
            <button onClick={() => handleDeleteSong(song.song_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSongs;
