import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import baseUrl from "./baseUrl";
import "./SearchResult.css";
import SearchTool from './SearchTool';

const SearchResult = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/videos?query=${searchQuery}`);
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div className="search-result-container">
      <SearchTool />
      <h2 className="search-title">Searching for "{searchQuery}"...</h2>
      <div className="video-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <Link to={`/video/${video.id.videoId}?title=${encodeURIComponent(video.snippet.title)}&thumbnail=${encodeURIComponent(video.snippet.thumbnails.medium.url)}`}>
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
      {loading && <p className="loading-text">Loading...</p>}
      
    </div>
    
  );
};

export default SearchResult;
