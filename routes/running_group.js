const express = require("express");
const router = express.Router();
const {RunningGroup} = require("../db/ready_race_run");
const {getStates, getFiltered} = require("../views/public/javascript/searchResults")
const {UserInfo, getUserLoggedIn, getUserInfo, clearUserLoggedIn} = require("./data/userData");

router.get("/", (req, res) => {
     RunningGroup.fetchAll()
    .then( async RunningGroup => {
      user = await getUserLoggedIn();
      result = JSON.parse(JSON.stringify( RunningGroup))
      res.status(200).render('allrunninggroups', { query: "", state: "", data: getFiltered(result, "", "All"), states: getStates(result), user:getUserLoggedIn() });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  RunningGroup.fetchAll()
  .then( async runningGroups => {
    user = await getUserLoggedIn();
    result = JSON.parse(JSON.stringify( runningGroups))
    res.status(200).render('allrunninggroups', { query: req.body.query, 
      state: req.body.selectpicker, 
      data: getFiltered(result, req.body.query, req.body.selectpicker), 
      states: getStates(result) , user:getUserLoggedIn() });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/:id", (req, res) => {
  console.log(req.params.id)
     RunningGroup.where({ id: req.params.id })
      .fetch()
      .then( async running_groups => {
        user = await getUserLoggedIn();
        res.status(200).render('runninggroup', {  data: JSON.parse(JSON.stringify(running_groups)), user:getUserLoggedIn() });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.post("/delete/:id", (req, res) => {
     RunningGroup.where({ id: req.params.id })
      .fetch()
      .then( RunningGroup => {
        if (! RunningGroup) {
          res.status(404).json({ message: " RunningGroup not found" });
        } else {
           RunningGroup
            .destroy()
            .then(() => {
              res.status(200).render('index', { data: JSON.parse(JSON.stringify( RunningGroup)) });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
  });
module.exports = router;
