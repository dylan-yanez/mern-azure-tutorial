import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const LikeButton = ({ videoId, videoTitle }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the user has already liked the video
    const checkLikeStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/checklike?videoId=${videoId}`);
        setLiked(response.data.liked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [videoId]);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.post(`${baseUrl}/unlike?videoId=${videoId}`);
      } else {
        await axios.post(`${baseUrl}/like?videoId=${videoId}&videoTitle=${encodeURIComponent(videoTitle)}`);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };  

  return (
    <button className="button-29" onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
  );
};

export default LikeButton;