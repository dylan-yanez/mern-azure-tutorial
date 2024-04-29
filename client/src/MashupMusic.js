import React from 'react';
import { Link } from 'react-router-dom';

const MashupMusic = () => {
  const mashupSongs = [
    {
      id: 'Xf8JghDhccM',
      title: 'Sweater Weather x After Dark',
      thumbnailUrl: 'https://i.ytimg.com/vi/Xf8JghDhccM/mqdefault.jpg'
    },
    {
      id: 'Fw2fMqw9Q1w',
      title: 'Suffocation x Goth (mashup)',
      thumbnailUrl: 'https://i.ytimg.com/vi/Fw2fMqw9Q1w/mqdefault.jpg'
    },
    {
      id: 'Jpui968xRaA',
      title: 'Say yes to heaven x shoout',
      thumbnailUrl: 'https://i.ytimg.com/vi/Jpui968xRaA/mqdefault.jpg'
    },
    {
      id: 'Rj89UzqViMU',
      title: 'Soap x IDFC mashup',
      thumbnailUrl: 'https://i.ytimg.com/vi/Rj89UzqViMU/mqdefault.jpg'
    },
    {
      id: 'yZtKqyklmgE',
      title: 'another love x set fire to the rain',
      thumbnailUrl: 'https://i.ytimg.com/vi/yZtKqyklmgE/mqdefault.jpg'
    }
  ];

  return (
    <div className="mashup-music">
      <div className="video-container">
        {mashupSongs.map((song) => (
          <div key={song.id} className="video-card">
            <Link
              to={`/video/${song.id}?title=${encodeURIComponent(song.title)}&thumbnail=${encodeURIComponent(song.thumbnailUrl)}`}
              className="video-link"
            >
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{song.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MashupMusic;
