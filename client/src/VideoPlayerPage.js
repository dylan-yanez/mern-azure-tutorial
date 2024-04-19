import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Construct the video URL using the videoId
    const constructedVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    setVideoUrl(constructedVideoUrl);
  }, [videoId]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-player-page">
      <h2>Video Player</h2>
      <div className="player-wrapper">
        {/* React Player to play the video */}
        <ReactPlayer
          url={videoUrl}
          playing={isPlaying}
          controls={false} // Hide the default controls
          width="0" // Set width to 0 to hide the video
          height="0" // Set height to 0 to hide the video
          style={{ visibility: 'hidden' }} // Hide the video element
        />
      </div>
      {/* Buttons to play/pause the video */}
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default VideoPlayerPage;