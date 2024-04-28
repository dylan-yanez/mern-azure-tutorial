import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './VideoPlayerPage.css'; // Import CSS file for styles
import SearchTool from './SearchTool';
import LikeButton from './LikeButton';
import SessionInfoComponent from './SessionInfoComponent';
import AddToPlaylistButton from './AddToPlaylistButton'; // Import the AddToPlaylistButton component
import DiscoverSong from './DiscoverSong';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const title = new URLSearchParams(location.search).get('title');
  const thumbnail = new URLSearchParams(location.search).get('thumbnail');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5); // Initial volume level
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false); // Flag to indicate whether seeking is in progress
  const playerRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Construct the video URL using the videoId
    const constructedVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    setVideoUrl(constructedVideoUrl);
  }, [videoId]);

  const handleBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    // Reset the video playback
    playerRef.current.seekTo(0);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleProgress = (progress) => {
    if (!seeking) {
      setCurrentTime(progress.playedSeconds);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    previousTimeRef.current = newTime;
  };

  const animateSeek = () => {
    const currentTime = playerRef.current.getCurrentTime();
    setCurrentTime(currentTime);
    previousTimeRef.current = currentTime;

    if (currentTime < duration && !seeking) {
      requestRef.current = requestAnimationFrame(animateSeek);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
    cancelAnimationFrame(requestRef.current);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current.seekTo(currentTime);
    requestRef.current = requestAnimationFrame(animateSeek);
  };

  const handleEnded = () => {
    // Restart the video
    handleRestart();
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateSeek);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Run only once on component mount

  return (
    //Background
      //Container
        //Search
        //Back Button
      //Song Name
      //Thumbnail
      //Volume Controlls & buttons
      //Session Info
    <div className="music-player-background">
      <div className="video-player-container">
        <div className="back-button">
          {/* Back button */}
          <button class="button-29" onClick={handleBack} role="button">Back</button>
        </div>
        {/* Title */}
        <div className="video-title">
          <h1 className ="videotitlesmall">{title}</h1>
          <img src={thumbnail} alt="Thumbnail" className="video-thumbnail" />
        </div>
        <div className="video-player-wrapper">
          {/* React Player to play the video */}
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={isPlaying}
            volume={volume}
            controls={false} // Hide the default controls
            width="0" // Set width to 0 to hide the video
            height="0" // Set height to 0 to hide the video
            style={{ visibility: 'hidden' }} // Hide the video element
            onProgress={handleProgress} // Track video progress
            onDuration={handleDuration} // Get total duration of the video
            onEnded={handleEnded}
          />
        </div>
        {/* Buttons to control video playback */}
        <div className="controls">
          <div className="button-controls">
            <button class="button-29" onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button class="button-29" onClick={handleRestart}>Restart</button>
          </div>
          <div className="like-button-controls">
            {/* More Buttons */}
            <LikeButton videoId={videoId} videoTitle={title} />
            <AddToPlaylistButton songId={videoId} songTitle={title} />
          </div>
          <br></br>
          {/* Volume adjuster */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <SessionInfoComponent />
        </div>
        {/* Video timeline and time display */}
        <div className="timeline">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
          />
          <span>{formatTime(currentTime)}/{formatTime(duration)}</span>
        </div>
        <br></br>
        <div className="discover-song-container">
        <h4>Discover a Song</h4>
          <div className="discover-song">
            {/* Discover a New Song Here */}
            {videoId && <DiscoverSong />}
          </div>
        </div>
      </div>
    </div>
      );
    };

// Function to format time in MM:SS format
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default VideoPlayerPage;