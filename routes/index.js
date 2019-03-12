const express = require("express");
const router = express.Router();
const user = require("../db/models/user");
const runningGroup = require("../db/models/running_group");
const race = require("../db/models/race");

router.get("/", (req, res) => {
  res.render('index', { data: {login: true} })
});

router.get("/admin/createrunninggroup", (req, res) => {
  res.render('admin/createrunninggroup')
});

router.get("/admin/createrace", (req, res) => {
  res.render('admin/createrace')
});
router.post("/admin/createrace/", (req, res) => {
  race.forge(req.body)
    .save()
    .then(race => {
      res.status(200).render('race', { data: JSON.parse(JSON.stringify(race)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

getPanel = (req, res) => {
  user.fetchAll()
  .then(users => {
      res.status(200).render('admin/panel', { data: JSON.parse(JSON.stringify(users)) });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
};

getAllUsers = (req, res) => {
  user.fetchAll()
  .then(users => {
      res.status(200).render('admin/viewusers', { data: JSON.parse(JSON.stringify(users)) });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
};



router.get("/admin/", getPanel);
router.get("/admin/users", getAllUsers);

module.exports = router;
