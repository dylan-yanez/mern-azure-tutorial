import React from 'react';
import { Link } from 'react-router-dom';
//import './PopularTikTokSongs.css'; // Import the CSS file

const OneheartSection = () => {
  const videos = [
    {
      id: 'J4RxO3lRsi0',
      snippet: {
        title: 'this feeling',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/J4RxO3lRsi0/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: '1ZqqLqWQtko',
      snippet: {
        title: 'apathy',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/1ZqqLqWQtko/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: 'rpG6Iz0w4Z0',
      snippet: {
        title: 'I was only temporary',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/rpG6Iz0w4Z0/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: 'ENIDzfg1ecI',
      snippet: {
        title: 'shootout',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/ENIDzfg1ecI/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: 'dm87PN-fTlg',
      snippet: {
        title: 'its okay youre okay',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/dm87PN-fTlg/mqdefault.jpg'
          }
        }
      }
    }
  ];

  return (
    <div className="popular-tiktok-songs">
      <div className="video-container">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <Link
              to={`/video/${video.id}?title=${encodeURIComponent(video.snippet.title)}&thumbnail=${encodeURIComponent(video.snippet.thumbnails.medium.url)}`}
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

export default OneheartSection;