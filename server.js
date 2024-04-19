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

app.get("/videos", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDW5Hsh46Vm10dY-IvCDLBtpBZaPNi30Q4&part=snippet&type=video&q=${query}&maxResults=15`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for fetching popular TikTok songs
app.get("/tiktoksongs", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDW5Hsh46Vm10dY-IvCDLBtpBZaPNi30Q4&part=snippet&type=video&q=oneheart&maxResults=5`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TikTok songs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for fetching popular slowed and reverb songs
app.get("/slowedandreverb", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDW5Hsh46Vm10dY-IvCDLBtpBZaPNi30Q4&part=snippet&type=video&q=popular%20slowed%20and%20reverb%20songs&maxResults=5`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching slowed and reverb songs:", error);
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
