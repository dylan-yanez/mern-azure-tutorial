import React, { useState, useEffect } from 'react';

const DiscoverSong = () => {
    const [randomSongs, setRandomSongs] = useState([]);

    useEffect(() => {
        // Fetch random songs when component mounts
        setRandomSongs(selectRandomSongs());
    }, []);

    const selectRandomSongs = () => {
        const videos = [
            {
                id: 'ecksWCgaOPg',
                snippet: {
                    title: 'Save me - Super Slowed',
                    thumbnail: 'https://i.ytimg.com/vi/ecksWCgaOPg/mqdefault.jpg'
                }
            },
            {
                id: 'QKNycONvO88',
                snippet: {
                    title: 'in the back of my mind',
                    thumbnail: 'https://i.ytimg.com/vi/QKNycONvO88/mqdefault.jpg'
                }
            },
            {
                id: 'jx5FWEeEukA',
                snippet: {
                    title: 'Shiloh dynasty - so low',
                    thumbnail: 'https://i.ytimg.com/vi/jx5FWEeEukA/mqdefault.jpg'
                }
            },
            {
                id: 'xC5GH-RC11w',
                snippet: {
                    title: 'past lives - sapientdream',
                    thumbnail: 'https://i.ytimg.com/vi/xC5GH-RC11w/mqdefault.jpg'
                }
            },
            {
                id: 'Eo6L6h_Oz-A',
                snippet: {
                    title: '8d audio // snowfall',
                    thumbnail: 'https://i.ytimg.com/vi/Eo6L6h_Oz-A/mqdefault.jpg'
                }
            },
            {
                id: 'z_XymnAQOB8',
                snippet: {
                    title: 'life letters - slowed',
                    thumbnail: 'https://i.ytimg.com/vi/z_XymnAQOB8/mqdefault.jpg'
                }
            },
            {
                id: '56be1Zk_qCg',
                snippet: {
                    title: 'Happy Nation',
                    thumbnail: 'https://i.ytimg.com/vi/56be1Zk_qCg/mqdefault.jpg'
                }
            },
            {
                id: 'R7VQWgbglb4',
                snippet: {
                    title: 'xxxtentacion - revenge',
                    thumbnail: 'https://i.ytimg.com/vi/R7VQWgbglb4/mqdefault.jpg'
                }
            },
            {
                id: 'vT5tC-qZ3lI',
                snippet: {
                    title: 'Death Is No More (Slowed)',
                    thumbnail: 'https://i.ytimg.com/vi/vT5tC-qZ3lI/mqdefault.jpg'
                }
            },
            {
                id: 'f4u6SVacVsc',
                snippet: {
                    title: 'ka$tro — in essence',
                    thumbnail: 'https://i.ytimg.com/vi/f4u6SVacVsc/mqdefault.jpg'
                }
            },
            {
                id: 'l4utYNcIw68',
                snippet: {
                    title: 'PASTEL GHOST - SILHOUETTE',
                    thumbnail: 'https://i.ytimg.com/vi/l4utYNcIw68/mqdefault.jpg'
                }
            },
            {
                id: 'qQSasEYg5B8',
                snippet: {
                    title: "I'm only a fool for you",
                    thumbnail: 'https://i.ytimg.com/vi/qQSasEYg5B8/mqdefault.jpg'
                }
            },
            {
                id: 'R1vx49mTtD0',
                snippet: {
                    title: 'Diedlonely Enouement - Stellar',
                    thumbnail: 'https://i.ytimg.com/vi/R1vx49mTtD0/mqdefault.jpg'
                }
            },
            {
                id: 'ko4Y84INSgk',
                snippet: {
                    title: "maybe for you there's a tomorrow",
                    thumbnail: 'https://i.ytimg.com/vi/ko4Y84INSgk/mqdefault.jpg'
                }
            },
            {
                id: 'cLupeDNMauk',
                snippet: {
                    title: 'Sleepwalker (Slowed)',
                    thumbnail: 'https://i.ytimg.com/vi/cLupeDNMauk/mqdefault.jpg'
                }
            }
        ];

        // Shuffle array to get random songs
        const shuffledSongs = videos.sort(() => Math.random() - 0.5);

        const uniqueRandomSongs = shuffledSongs.slice(0, 4);

        return uniqueRandomSongs;
    };

    return (
        <div className="popular-tiktok-songs">
            <div className="video-container">
                {randomSongs.map(randomSong => (
                    <div key={randomSong.id} className="video-card">
                        <a href={`/video/${randomSong.id}?title=${encodeURIComponent(randomSong.snippet.title)}&thumbnail=${encodeURIComponent(randomSong.snippet.thumbnail)}`} className="video-link">
                            <img src={randomSong.snippet.thumbnail} alt={randomSong.snippet.title} className="video-thumbnail" />
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
