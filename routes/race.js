const express = require("express");
const router = express.Router();
const {Race} = require("../db/ready_race_run");
const {getStates, getFiltered} = require("../views/public/javascript/searchResults")
const {SignUp, RaceDetails, SingleRace} = require("./data/raceData");
const {getUserLoggedIn} = require("./data/userData");

router.get("/", async (req, res) => {
  let user = getUserLoggedIn();
  let responses = await RaceDetails('');
  res.status(200).render('viewraces', { query: "", state: "", data: getFiltered(responses, "", "All"), states: getStates(responses), races: user.races, running_groups: user.running_groups, user:user });
});

router.post("/", async (req, res) => {
    user = getUserLoggedIn();
    let result = RaceDetails(req.body.selectpicker);
    // console.log("GETTING FILTER", getFiltered(result, req.body.query, req.body.selectpicker))
    res.status(200).render('viewraces', { query: req.body.query, 
      state: req.body.selectpicker, 
      data: getFiltered(result, req.body.query, req.body.selectpicker), 
      states: getStates(result) , user:user });
});

router.get("/upcoming/:name", async (req, res) => {
  user = await getUserLoggedIn();
  race = await SingleRace(req.params.name);
  res.status(200).render('race', {  data: JSON.parse(JSON.stringify(race)), user:user });
});

router.get("/signup/:name", async (req, res) => {
  user = await getUserLoggedIn();
  race = await SingleRace(req.params.name);
  await SignUp(user, race)
  res.redirect(200, '../profile');
});

router.get("/:id", (req, res) => {
  console.log(req.params.id)
     Race.where({ id: req.params.id })
      .fetch()
      .then( async races => {
        user = await getUserLoggedIn();
        res.status(200).render('race', {  data: JSON.parse(JSON.stringify(races)), user:getUserLoggedIn() });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
router.post("/delete/:id", (req, res) => {
     Race.where({ id: req.params.id })
      .fetch()
      .then( Race => {
        if (! Race) {
          res.status(404).json({ message: " Race not found" });
        } else {
           Race
            .destroy()
            .then(() => {
              res.status(200).render('index', { data: JSON.parse(JSON.stringify( Race)) });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
  });
module.exports = router;
