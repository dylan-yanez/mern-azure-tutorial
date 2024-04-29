import React from 'react';
import { Link } from 'react-router-dom';

const MoodMelodies = () => {
  const moodSongs = [
    {
      id: 'lBg-bld9TU0',
      title: 'Billie Eilish - hotline bling slowed',
      thumbnailUrl: 'https://i.ytimg.com/vi/lBg-bld9TU0/mqdefault.jpg'
    },
    {
      id: '0Ghcjygr66g',
      title: 'lovely - billie eilish',
      thumbnailUrl: 'https://i.ytimg.com/vi/0Ghcjygr66g/mqdefault.jpg'
    },
    {
      id: 'b2A5w-1faqI',
      title: 'Ashe - Moral Of The Story',
      thumbnailUrl: 'https://i.ytimg.com/vi/b2A5w-1faqI/mqdefault.jpg'
    },
    {
      id: 'GimqOe-YbSM',
      title: 'Space Song slowed',
      thumbnailUrl: 'https://i.ytimg.com/vi/GimqOe-YbSM/mqdefault.jpg'
    },
    {
      id: '_zSdQRoHTYE',
      title: 'lana del rey - cola',
      thumbnailUrl: 'https://i.ytimg.com/vi/_zSdQRoHTYE/mqdefault.jpg'
    }
  ];

  return (
    <div className="mood-melodies">
      <div className="video-container">
        {moodSongs.map((song) => (
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

export default MoodMelodies;
