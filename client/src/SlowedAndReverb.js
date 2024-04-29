import React from 'react';
import { Link } from 'react-router-dom';

const SlowedAndReverb = () => {
  const slowedSongs = [
    {
      id: 'BHiq5ZAwpuc',
      title: 'vague003 - drowning',
      thumbnailUrl: 'https://i.ytimg.com/vi/BHiq5ZAwpuc/mqdefault.jpg'
    },
    {
      id: 'VuGvr25WP14',
      title: 'bedroom - in my head',
      thumbnailUrl: 'https://i.ytimg.com/vi/VuGvr25WP14/mqdefault.jpg'
    },
    {
      id: 'gLLW2OSSI4I',
      title: 'linkin park - in the end',
      thumbnailUrl: 'https://i.ytimg.com/vi/gLLW2OSSI4I/mqdefault.jpg'
    },
    {
      id: 'eGdcgjfKXwg',
      title: 'xxxtentacion - moonlight',
      thumbnailUrl: 'https://i.ytimg.com/vi/eGdcgjfKXwg/mqdefault.jpg'
    },
    {
      id: '6TOKz8QHyX0',
      title: 'the neighbourhood - sweater weather',
      thumbnailUrl: 'https://i.ytimg.com/vi/6TOKz8QHyX0/mqdefault.jpg'
    }
  ];

  return (
    <div className="slowed-and-reverb">
      <div className="video-container">
        {slowedSongs.map((song) => (
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

export default SlowedAndReverb;
