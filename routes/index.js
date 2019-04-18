const express = require("express");
const router = express.Router();
const {User, Race} = require("../db/ready_race_run");
const {getUserLoggedIn} = require("./data/userData");
const {getStates, getFiltered, getFilteredUsers} = require("../views/public/javascript/searchResults")


router.get("/", async (req, res) => {
  user = await getUserLoggedIn();
  res.status(200).render('index', { data: {}, user:user});
});

router.get("/admin/createrunninggroup", async(req, res) => {
  user = await getUserLoggedIn();
  res.render('admin/createrunninggroup', {  data: {}, user:user});
});

router.get("/admin/createrace/", (req, res) => {
   Race.forge(req.body)
    .save()
    .then( async Race => {
      user = await getUserLoggedIn();
      res.status(200).render('admin/createrace', { data: JSON.parse(JSON.stringify(Race)), user:user});
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
      res.status(200).render('admin/panel', { data: JSON.parse(JSON.stringify(Users)), user:user});
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
      res.status(200).render('admin/viewUsers', { data: JSON.parse(JSON.stringify(Users)), user:user});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post("/admin/Users", (req, res) => {
  User.fetchAll()
 .then( async Users => {
     user = await getUserLoggedIn();
     result = JSON.parse(JSON.stringify( Users))
     res.status(200).render('admin/viewUsers', { data: JSON.parse(JSON.stringify(Users)), 
      data: getFilteredUsers(result, req.body.query), user:user});
 })
 .catch(err => {
     console.log(err);
     res.status(500).json(err);
 });
});


module.exports = router;
