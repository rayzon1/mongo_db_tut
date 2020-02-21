const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// ROUTES
const postsRoute = require('./routes/posts');
app.use('/api/posts', postsRoute);

app.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    message: "Welcome to my first M.E.R.N API"
  });
});

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

app.listen(3000);
