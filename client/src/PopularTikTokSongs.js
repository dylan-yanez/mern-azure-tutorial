import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import baseUrl from "./baseUrl";

const PopularTikTokSongs = ({ query }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/sections?query=${encodeURIComponent(query)}`);
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [query]);

  return (
    <div className="popular-tiktok-songs">
      <div className="video-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <Link
              to={`/video/${video.id.videoId}?title=${encodeURIComponent(video.snippet.title)}&thumbnail=${encodeURIComponent(video.snippet.thumbnails.medium.url)}`}
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