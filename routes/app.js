const express = require("express");
const app = express();
const router = express.Router();

app.get('/', (req, res) => {
    res.status(200);
  });
  //testing github account
module.exports = app