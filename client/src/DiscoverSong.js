import React, { useState, useEffect } from 'react';
//import './DiscoverSong.css';

const DiscoverSong = () => {
    const [randomSongs, setRandomSongs] = useState([]);

    useEffect(() => {
        // Fetch random songs when component mounts
        setRandomSongs(selectRandomSongs());
    }, []);

    const selectRandomSongs = () => {
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

        // Shuffle array to get random songs
        const shuffledSongs = videos.sort(() => Math.random() - 0.5);

        // Select three unique random songs
        const uniqueRandomSongs = Array.from(new Set(shuffledSongs)).slice(0, 5);

        return uniqueRandomSongs;
    };

    return (
        <div className="popular-tiktok-songs">
            <div className="video-container">
                {randomSongs.map(randomSong => (
                    <div key={randomSong.id} className="video-card">
                        <a href={`/video/${randomSong.id}?title=${encodeURIComponent(randomSong.snippet.title)}&thumbnail=${encodeURIComponent(randomSong.snippet.thumbnails.medium.url)}`} className="video-link">
                            <img src={randomSong.snippet.thumbnails.medium.url} alt={randomSong.snippet.title} className="video-thumbnail" />
                            <div className="video-info">
                                <h3 className="video-title">{randomSong.snippet.title}</h3>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscoverSong;
