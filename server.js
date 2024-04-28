require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const port = process.env.PORT || 3001;
const pool = require("./db");
const bodyParser = require('body-parser');
const path = require('path');
const axios = require("axios");
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Set up sessions
/*
app.use(session({
  secret: '',
  resave: false,
  saveUninitialized: true
}));*/
app.use(session({
  secret: '$323*xSdzEEE#FFF',
  resave: false, // Avoid unnecessary session writes
  saveUninitialized: false, // Create sessions for new visitors
  cookie: {
    secure: false, // Only send cookies over HTTPS if true, set to false for development
    maxAge: 1 * 60 * 60 * 1000, // Session expiration time (1 hour)
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: 'strict' // Mitigate CSRF attacks
  }
}));

const apiKey = process.env.Api_Key_YT;

app.post('/checklogin', (req, res) => {
  const isLoggedIn = req.session.userId ? true : false;
  res.status(200).json({ isLoggedIn });
});

app.get('/api/users', async (req, res) => {
  try {
    // Query all users from the database
    const users = await pool.query('SELECT id, username, email FROM users');

    // Send the list of users as a response
    res.status(200).json(users.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/api/users/:userId/playlists', async (req, res) => {
  const { userId } = req.params;

  // Check if the user is an admin
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: 'You are not authorized to perform this action' });
  }

  try {
    // Delete all songs created by the user
    await pool.query(
      'DELETE FROM playlist_songs WHERE created_by = $1',
      [userId]
    );

    // Delete all playlists created by the user
    await pool.query(
      'DELETE FROM playlists WHERE creator_id = $1',
      [userId]
    );

    res.status(200).json({ message: 'User playlists and associated songs deleted successfully' });
  } catch (error) {
    console.error('Error deleting user playlists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/users/:userId/liked-songs', async (req, res) => {
  const { userId } = req.params;

  // Check if the user is an admin
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: 'You are not authorized to perform this action' });
  }

  try {
    // Delete all liked songs by the user
    await pool.query(
      'DELETE FROM likes WHERE user_id = $1',
      [userId]
    );

    res.status(200).json({ message: 'User liked songs deleted successfully' });
  } catch (error) {
    console.error('Error deleting user liked songs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  // Check if the user is an admin
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: 'You are not authorized to perform this action' });
  }

  try {
    // Call the delete user playlists endpoint
    await axios.delete(`${baseUrl}/api/users/${userId}/playlists`);

    // Call the delete user liked songs endpoint
    await axios.delete(`${baseUrl}/api/users/${userId}/liked-songs`);

    // Delete the user
    await pool.query(
      'DELETE FROM users WHERE user_id = $1',
      [userId]
    );

    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting user and associated data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Endpoint to log out the user
app.post('/logout', (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      // Clear the session cookie
      res.clearCookie('sessionId');
      res.status(200).json({ message: 'User logged out successfully' });
    }
  });
});


app.delete('/api/playlists/:playlistId/songs/:songId', async (req, res) => {
  const { playlistId, songId } = req.params;
  const userId = req.session.userId; // Assuming user ID is stored in session

  try {
    // Check if the playlist exists and belongs to the user
    const playlist = await pool.query(
      'SELECT * FROM playlists WHERE id = $1 AND creator_id = $2',
      [playlistId, userId]
    );

    if (playlist.rows.length === 0) {
      return res.status(403).json({ message: 'You are not authorized to delete songs from this playlist' });
    }

    // Delete the song from the playlist_songs table
    await pool.query(
      'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
      [playlistId, songId]
    );

    res.status(200).json({ message: 'Song deleted from playlist successfully' });
  } catch (error) {
    console.error('Error deleting song from playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/playlists/:id/songs', async (req, res) => {
  const { id } = req.params;
  const { songId, songTitle } = req.body;
  const userId = req.session.userId; // Assuming user ID is stored in session

  try {
    // Check if the playlist exists and belongs to the user
    const playlist = await pool.query(
      'SELECT * FROM playlists WHERE id = $1 AND creator_id = $2',
      [id, userId]
    );

    if (playlist.rows.length === 0) {
      return res.status(403).json({ message: 'You are not authorized to add songs to this playlist' });
    }

    // Check if the song is already added to the playlist
    const existingSong = await pool.query(
      'SELECT * FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 AND user_id = $3',
      [id, songId, userId]
    );

    if (existingSong.rows.length > 0) {
      return res.status(400).json({ message: 'This song is already added to the playlist' });
    }

    // Insert the song into the playlist_songs table
    await pool.query(
      'INSERT INTO playlist_songs (playlist_id, song_id, song_name, user_id) VALUES ($1, $2, $3, $4)',
      [id, songId, songTitle, userId] // Include userId in the INSERT statement
    );

    res.status(200).json({ message: 'Song added to playlist successfully' });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Backend endpoint to fetch songs of a specific playlist
app.get('/api/playlists/:id/songs', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId; // Assuming user ID is stored in session

  try {
    // Check if the playlist exists and belongs to the user
    const playlist = await pool.query(
      'SELECT * FROM playlists WHERE id = $1 AND creator_id = $2',
      [id, userId]
    );

    if (playlist.rows.length === 0) {
      return res.status(403).json({ message: 'You are not authorized to view this playlist' });
    }

    // Fetch songs of the playlist
    const songs = await pool.query(
      'SELECT * FROM playlist_songs WHERE playlist_id = $1',
      [id]
    );

    // Send the playlist description and its songs
    res.status(200).json({ description: playlist.rows[0].description, songs: songs.rows });
  } catch (error) {
    console.error('Error fetching playlist songs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/api/sessionInfo', (req, res) => {
  // Retrieve the userId from the session
  const userId = req.session.userId;
  console.log(req.session)
  // Send the userId in the response
  res.json({ userId });
});

app.post('/testdb', async (req, res) => {
  const { text } = req.body;
  try {
      const newRecord = await pool.query(
          'INSERT INTO test_table (text) VALUES ($1) RETURNING *',
          [text]
      );
      res.json(newRecord.rows[0]); // Return the inserted record
  } catch (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/playlists/:id', async (req, res) => {
  const playlistId = req.params.id;
  const userId = req.session.userId;

  try {
    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({ message: 'You need to be logged in to delete a playlist' });
    }

    // Check if the playlist belongs to the logged-in user
    const playlist = await pool.query(
      'SELECT * FROM playlists WHERE id = $1 AND creator_id = $2',
      [playlistId, userId]
    );

    if (playlist.rows.length === 0) {
      return res.status(403).json({ message: 'You are not authorized to delete this playlist' });
    }

    // First, delete all songs associated with the playlist
    await pool.query(
      'DELETE FROM playlist_songs WHERE playlist_id = $1',
      [playlistId]
    );

    // Then, delete the playlist itself
    await pool.query(
      'DELETE FROM playlists WHERE id = $1',
      [playlistId]
    );

    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to fetch playlists
app.get('/api/playlists', async (req, res) => {
  // Check if the user is logged in
  if (!req.session.userId) {
    return res.status(401).json({ message: 'You must be logged in to fetch playlists' });
  }

  try {
    // Query the database to fetch playlists for the logged-in user
    const userId = req.session.userId;
    const userPlaylists = await pool.query(
      'SELECT * FROM playlists WHERE creator_id = $1',
      [userId]
    );

    res.json(userPlaylists.rows);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to create playlists
app.post('/api/playlists', async (req, res) => {
  // Check if the user is logged in
  if (!req.session.userId) {
    return res.status(401).json({ message: 'You must be logged in to create playlists' });
  }

  const { name, description } = req.body;
  const userId = req.session.userId;

  try {
    // Insert the new playlist into the database
    const newPlaylist = await pool.query(
      'INSERT INTO playlists (name, description, creator_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, userId]
    );

    res.status(201).json(newPlaylist.rows[0]);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.post('/logindetails', async (req, res) => {
  const { username, password } = req.body; // Change email to username

  try {
    // Check if the user exists in the database
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1', // Search by username instead of email
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const hashedPassword = user.rows[0].password_hash;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Store the user ID in the session
    req.session.userId = user.rows[0].user_id;
    req.session.isAdmin = user.rows[0].is_admin;
    //console.log(req.session);

    res.cookie('sessionId', req.session.id, {
      maxAge: 1 * 60 * 60 * 1000, // Same expiration time as session
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: 'strict' // Mitigate CSRF attacks
    });

    // If username and password match, return the user data
    //res.status(200).json(user.rows[0]);
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signupdetails', async (req, res) => {
  const { email, username, password } = req.body; // Remove firstname and lastname from destructuring

  try {
    // Check if the username or email already exists in the database
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // If the username and email are unique, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *', // Remove firstname and lastname from the query
      [email, username, hashedPassword] // Remove firstname and lastname from the array
    );

    // Store the user ID in the session
    //req.session.userId = newUser.rows[0].id; // probably wont work edited out because users still need to login
    

    // Send a success response with the newly created user
    //res.status(201).json(newUser.rows[0]);
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/likedvideos', async (req, res) => {
  const userId = req.session.userId; // Assuming the user ID is stored in the session

  try {
    // Query the database to get all the liked videos for the user ID
    const likedVideos = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1',
      [userId]
    );

    res.json(likedVideos.rows);
  } catch (error) {
    console.error('Error fetching liked videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/like', async (req, res) => {
  const { videoId, videoTitle } = req.query; // Receive videoId and videoTitle from query
  let userId = req.session.userId || 1; // Assuming user ID is stored in session, fallback to user ID 1 if session is not available

  try {
    // Check if the user has already liked the video
    const existingLike = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1 AND video_id = $2',
      [userId, videoId]
    );

    if (existingLike.rows.length > 0) {
      return res.status(400).json({ message: 'User already liked the video' });
    }

    // Insert the like into the database
    await pool.query(
      'INSERT INTO likes (user_id, video_id, video_title) VALUES ($1, $2, $3)',
      [userId, videoId, videoTitle] // Insert videoTitle into the query parameters
    );

    res.status(200).json({ message: 'Video liked successfully' });
  } catch (error) {
    console.error('Error liking video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/unlike', async (req, res) => {
  const { videoId } = req.query;
  let userId = req.session.userId; // Assuming user ID is stored in session

  try {
    // Check if the user has liked the video
    const existingLike = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1 AND video_id = $2',
      [userId, videoId]
    );

    if (existingLike.rows.length === 0) {
      return res.status(400).json({ message: 'User has not liked the video' });
    }

    // Remove the like from the database
    await pool.query(
      'DELETE FROM likes WHERE user_id = $1 AND video_id = $2',
      [userId, videoId]
    );

    res.status(200).json({ message: 'Video unliked successfully' });
  } catch (error) {
    console.error('Error unliking video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/checklike', async (req, res) => {
  const { videoId } = req.query;
  const userId = req.session.userId; // Assuming user ID is stored in session

  try {
    // Check if the user has liked the video
    const existingLike = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1 AND video_id = $2',
      [userId, videoId]
    );

    res.status(200).json({ liked: existingLike.rows.length > 0 });
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/videos", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${query}&maxResults=15&fields=items(id/videoId,snippet/title,snippet/thumbnails/medium/url)`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});