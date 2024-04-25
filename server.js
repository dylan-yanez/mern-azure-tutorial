require("dotenv").config();
const express = require("express");
const cors = require("cors");
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

const apiKey = process.env.Api_Key_YT;

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

    // If username and password match, return the user data
    res.status(200).json(user.rows[0]);
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

    // Send a success response with the newly created user
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error signing up:', error);
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
/*
***** No Longer in Use
app.get("/sections", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${query}&maxResults=5&fields=items(id/videoId,snippet/title,snippet/thumbnails/medium/url)`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); */ 


app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
