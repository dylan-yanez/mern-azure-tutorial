import React, { useState } from 'react';
import './PlaylistForm.css'; // Import the CSS file for styling

const PlaylistForm = ({ onCreatePlaylist }) => {
  const [playlistData, setPlaylistData] = useState({
    name: '',
    image: null,
    description: '',
    songs: []
  });

  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylistData({ ...playlistData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPlaylistData({ ...playlistData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePlaylist(playlistData);
    setShowForm(false); // Hide the form after submitting
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    
    <div>
      <button onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Create Playlist'}
      </button>
      {showForm && (
        <div className="playlist-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Create Playlist</h2>
            <input
              type="text"
              name="name"
              placeholder="Playlist Name"
              value={playlistData.name}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={playlistData.description}
              onChange={handleInputChange}
            />
            <button type="submit">Create Playlist</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlaylistForm;
