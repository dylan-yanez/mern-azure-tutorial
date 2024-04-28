import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from './baseUrl'; // Import baseUrl
import './LikedVideos.css';

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/likedvideos`); // Adjust the endpoint with baseUrl
        setLikedVideos(response.data);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    };

    fetchLikedVideos();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.post(`${baseUrl}/checklogin`); // Adjust the endpoint with baseUrl
        if (!response.data.isLoggedIn) {
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

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
