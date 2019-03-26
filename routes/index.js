const express = require("express");
const router = express.Router();
const {User, Race} = require("../db/ready_race_run");
const {getUserLoggedIn} = require("./data/userData");

router.get("/", async (req, res) => {
  user = await getUserLoggedIn();
  res.status(200).render('index', { data: JSON.parse(JSON.stringify(user)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
});

router.get("/admin/createrunninggroup", async(req, res) => {
  user = await getUserLoggedIn();
  res.render('admin/createrunninggroup', { data: JSON.parse(JSON.stringify(user)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
});

router.post("/admin/createrace/", (req, res) => {
   Race.forge(req.body)
    .save()
    .then( async Race => {
      user = await getUserLoggedIn();
      res.status(200).render('Race', { data: JSON.parse(JSON.stringify(Race)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/admin/", (req, res) => {
   User.fetchAll()
  .then( async Users => {
      user = await getUserLoggedIn();
      res.status(200).render('admin/panel', { data: JSON.parse(JSON.stringify(Users)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get("/admin/Users", (req, res) => {
   User.fetchAll()
  .then( async Users => {
      user = await getUserLoggedIn();
      res.status(200).render('admin/viewUsers', { data: JSON.parse(JSON.stringify(Users)) , races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});


module.exports = router;
