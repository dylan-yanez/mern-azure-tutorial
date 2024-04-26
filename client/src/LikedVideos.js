import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);

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
  }, []);

  return (
    <div className="liked-videos">
      <div className="video-container">
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