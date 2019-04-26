const express = require("express");
const router = express.Router();
const {Race, FutureRaces} = require("../db/ready_race_run");
const {getStates, getFiltered} = require("../views/public/javascript/searchResults")
const {RaceDetails, SingleRace, IsPartOf, Recommendation} = require("./data/raceData");
const {getUserLoggedIn} = require("./data/userData");
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);

router.get("/", async (req, res) => {
  let user = await getUserLoggedIn();
  let responses = await RaceDetails('', '');
  recommends = await Recommendation(user)
  console.log("RECOMMENDATIONS")
  
  res.status(200).render('viewraces', { query: "", state: "", data: responses, states: getStates(responses), races: user.races, running_groups: user.running_groups, user:user , recommends: recommends });
});

router.post("/", async (req, res) => {
    user = await getUserLoggedIn();
    let result = await RaceDetails(req.body.selectpicker, req.body.query);

    console.log("POST FILTER", req.body.query, req.body.selectpicker);
    recommends = await Recommendation(user)
    console.log("RECOMMENDATIONS")

    res.status(200).render('viewraces', { query: req.body.query, 
      state: req.body.selectpicker, 
      data: result, 
      states: getStates(result) , user:user , recommends: recommends});
});

router.get("/upcoming/:name", async (req, res) => {
  user = await getUserLoggedIn();
  race = await SingleRace(req.params.name);
  res.status(200).render('race', {  data: JSON.parse(JSON.stringify(race)), user:user, distances: race.distances, num_choices: race.distances.length, isPart: await IsPartOf(user.id, req.params.name)  });
});

router.post("/signup/:name", async (req, res) => {
  user = await getUserLoggedIn();
  race = await SingleRace(req.params.name);
  console.log("Selected value", req.body.selectpicker)
  
  new_race = {user_id:user.id,
    race_name:race.name,
    distance:req.body.selectpicker,
    city:race.city,
    state:race.state,
    zipcode:race.zipcode,
    phone:race.phone,
    url:race.url}

  FutureRaces.forge(new_race )
    .save(new_race)
    .then(async race => {
        result = JSON.parse(JSON.stringify( race))
        var fullUrl = req.protocol + '://' + req.get('host');
        res.redirect(fullUrl);
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
        res.status(200).render('race', {  data: JSON.parse(JSON.stringify(races)), user:getUserLoggedIn()});
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
