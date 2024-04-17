import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const PopularTikTokSongs = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/videos?query=BestSongsRightNow`);
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
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{video.snippet.title}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularTikTokSongs;