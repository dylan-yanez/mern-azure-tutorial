import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import baseUrl from "./baseUrl";

const PopularTikTokSongs = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tiktoksongs`);
        setVideos(response.data.items); // Assuming response.data contains an 'items' array
      } catch (error) {
        console.error('Error fetching TikTok songs:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="popular-tiktok-songs">
      <h2>Popular TikTok Songs</h2>
      <div className="video-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            {/* Replace <a> tag with <Link> */}
            <Link
              to={`/video/${video.id.videoId}`} // Route to VideoPlayerPage with videoId parameter
              className="video-link"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{video.snippet.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularTikTokSongs;
