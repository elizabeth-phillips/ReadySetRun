const express = require("express");
const router = express.Router();
const {Race} = require("../db/ready_race_run");
const {getStates, getFiltered} = require("../views/public/javascript/searchResults")
const {SignUp, RaceDetails, SingleRace} = require("./data/raceData");
const {getUserLoggedIn} = require("./data/userData");

router.get("/", async (req, res) => {
  let user = await getUserLoggedIn();
  let responses = await RaceDetails('', '');
  
  res.status(200).render('viewraces', { query: "", state: "", data: responses, states: getStates(responses), races: user.races, running_groups: user.running_groups, user:user });
});

router.post("/", async (req, res) => {
    user = await getUserLoggedIn();
    let result = await RaceDetails(req.body.selectpicker, req.body.query);

    console.log("POST FILTER", req.body.query, req.body.selectpicker);

    res.status(200).render('viewraces', { query: req.body.query, 
      state: req.body.selectpicker, 
      data: result, 
      states: getStates(result) , user:user });
});

router.get("/upcoming/:name", async (req, res) => {
  user = await getUserLoggedIn();
  race = await SingleRace(req.params.name);
  res.status(200).render('race', {  data: JSON.parse(JSON.stringify(race)), user:user, distances: race.distances, num_choices: race.distances.length });
});

router.post("/signup/:name", async (req, res) => {
  user = await getUserLoggedIn();
  race = await SingleRace(req.params.name);
  console.log(race.distances.indexOf("5K"), req.body.race, req.body)
  race = race.distances[race.distances.indexOf(req.body.race)]
  Race.forge( race )
    .save(req.body)
    .then(async race => {
        result = JSON.parse(JSON.stringify( race))
        console.log(result)
        var fullUrl = req.protocol + '://' + req.get('host');
        // res.redirect(fullUrl);
      })
      .catch(err => {
        console.log(err);
        res.redirect('back')
    });
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
