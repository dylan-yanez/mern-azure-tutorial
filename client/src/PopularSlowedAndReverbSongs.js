import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const PopularSlowedAndReverbSongs = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/slowedandreverb`);
        setVideos(response.data.items); // Assuming response.data contains an 'items' array
      } catch (error) {
        console.error('Error fetching Slowed and Reverb songs:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="popular-slowed-and-reverb-songs">
      <h2>Popular Slowed and Reverb Songs</h2>
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

export default PopularSlowedAndReverbSongs;