// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// ROUTES
const postsRoute = require('./routes/posts');
app.use('/api/posts', postsRoute);

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
