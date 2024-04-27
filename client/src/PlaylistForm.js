import React, { useState } from 'react';
import './PlaylistForm.css'; // Import the CSS file for styling

const PlaylistForm = ({ onCreatePlaylist }) => {
  const [playlistData, setPlaylistData] = useState({
    name: '',
    image: '', // Change to empty string to avoid errors with null image
    description: '',
    songs: []
  });

  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylistData({ ...playlistData, [name]: value });
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
              type="text"
              name="image"
              placeholder="Image URL (Test)"
              value="https://i.ytimg.com/vi/jM1c-bOUnV0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCfpFQO8e9aPdeCgfnNjAUQR3D0dQ" // Placeholder image URL
              disabled // Disable input field for image URL
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
