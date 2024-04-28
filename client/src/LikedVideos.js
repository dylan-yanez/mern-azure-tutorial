import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import './LikedVideos.css'; // Import CSS file for styling

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch liked videos data from the server
    const fetchLikedVideos = async () => {
      try {
        const response = await axios.get('/likedvideos'); // Adjust the endpoint accordingly
        setLikedVideos(response.data);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    };

    fetchLikedVideos();

    // Check login status
    const checkLoginStatus = async () => {
      try {
        const response = await axios.post('/checklogin');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="liked-videos-container">
      <h2 className="section-heading">Liked Videos</h2>
      <div className="video-grid">
        {likedVideos.map((video) => (
          <div key={video.id} className="video-card">
            <Link
              to={`/video/${video.video_id}?title=${encodeURIComponent(video.video_title)}&thumbnail=${encodeURIComponent(`https://i.ytimg.com/vi/${video.video_id}/mqdefault.jpg`)}`}
              className="video-link"
            >
              <img
                src={`https://i.ytimg.com/vi/${video.video_id}/mqdefault.jpg`}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{video.video_title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
