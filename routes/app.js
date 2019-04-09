//app.js
const express = require("express");
const app = express();
const router = express.Router();
const {User, Race} = require("../db/ready_race_run");
const {getUserLoggedIn} = require("./data/userData");

// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!')
// })

app.get('/', (req, res) => {
    // user = await getUserLoggedIn();
    res.status(200);
  });
  
module.exports = app