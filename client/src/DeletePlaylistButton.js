import React from 'react';
import axios from 'axios';
import baseUrl from './baseUrl';

const DeletePlaylistButton = ({ playlistId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/api/playlists/${playlistId}`);
      onDelete(playlistId);
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  return (
    <button className="delete-playlist-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeletePlaylistButton;
