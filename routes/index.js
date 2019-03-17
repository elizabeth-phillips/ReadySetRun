const express = require("express");
const router = express.Router();
const {User, Race} = require("../db/ready_race_run");

let currUser = null

router.get("/register", (req, res) => {
    res.render('index', { login: false,
                            data: JSON.parse(JSON.stringify(currUser))})
});

router.get("/", (req, res) => {
  res.render('index', { login: true,
                        data: JSON.parse(JSON.stringify(currUser))})
});

router.get("/admin/createrunninggroup", (req, res) => {
  res.render('admin/createrunninggroup')
});

router.get("/admin/createrace", (req, res) => {
  res.render('admin/createrace')
});
router.post("/admin/createrace/", (req, res) => {
   Race.forge(req.body)
    .save()
    .then( Race => {
      res.status(200).render('Race', { data: JSON.parse(JSON.stringify(Race)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/admin/", (req, res) => {
   User.fetchAll()
  .then( Users => {
      res.status(200).render('admin/panel', { data: JSON.parse(JSON.stringify( Users)) });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get("/admin/Users", (req, res) => {
   User.fetchAll()
  .then( Users => {
      res.status(200).render('admin/viewUsers', { data: JSON.parse(JSON.stringify( Users)) });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});


module.exports = router;
