require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
//const pool = require("./db"); Commented out because DB is not in use
const path = require('path');
const axios = require("axios");

//---------------------------------------things required for DB-----------------------------------------------------

//connect,create table,insert data
const pg = require('pg');


const config = {
    host: 'tunevistaserver.postgres.database.azure.com',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'admin1',     
    password: 'calcium12!',
    database: 'postgres',
    port: 5432,
    ssl: true
};


function queryDatabase() {
  const query = `
      DROP TABLE IF EXISTS inventory;
      CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
      INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
      INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
      INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
  `;

  client
      .query(query)
      .then(() => {
          console.log('Table created successfully!');
          client.end(console.log('Closed client connection'));
      })
      .catch(err => console.log(err))
      .then(() => {
          console.log('Finished execution, exiting now');
          process.exit();
      });
}
//set up DB connection
const client = new pg.Client(config);
function test(){
client.connect(err => {
    if (err) throw err;
    else {
      console.log("connection successful");
        queryDatabase();
    }
});
}
//calling function, can run npm start outside of client to see
test();



//--------------------------------------END DB STUFF----------------------------------------------------------------

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

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`hello, Server is running on post ${port}`);
});

