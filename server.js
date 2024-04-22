require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
//const pool = require("./db"); Commented out because DB is not in use
const path = require('path');
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const apiKey = process.env.Api_Key_YT;

app.get("/videos", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${query}&maxResults=15&fields=items(id/videoId,snippet/title,snippet/thumbnails/medium/url)`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
});


app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
