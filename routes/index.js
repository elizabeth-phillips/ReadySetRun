const express = require("express");
const router = express.Router();
const user = require("../db/models/user");



router.get("/", (req, res) => {
  res.render('index', { data: {login: true} })
});



module.exports = router;
