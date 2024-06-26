import React from 'react';
import { Link } from 'react-router-dom';
//import './PopularTikTokSongs.css'; // Import the CSS file

const PopularTikTokSongs = () => {
  const videos = [
    {
      id: 'EAry_V5lS2E',
      snippet: {
        title: 'Mosaique Solitaire',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/EAry_V5lS2E/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: 'R6K4oETN4Sk',
      snippet: {
        title: 'Autotune',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/R6K4oETN4Sk/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: '6mSUvONrwrc',
      snippet: {
        title: 'Dieu ne ment jamais',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/6mSUvONrwrc/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: 'G16dOV1hxmg',
      snippet: {
        title: 'amnésie',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/G16dOV1hxmg/mqdefault.jpg'
          }
        }
      }
    },
    {
      id: '7yQWoQ12YVc',
      snippet: {
        title: 'Kietu',
        thumbnails: {
          medium: {
            url: 'https://i.ytimg.com/vi/7yQWoQ12YVc/mqdefault.jpg'
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

export default PopularTikTokSongs;