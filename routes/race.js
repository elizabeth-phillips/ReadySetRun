const express = require("express");
const https = require("https");
const router = express.Router();
const {Race} = require("../db/ready_race_run");
const {getStates, getFiltered} = require("../views/public/javascript/searchResults")
const {RaceDetails} = require("./data/raceData");
const {getUserLoggedIn} = require("./data/userData");


// router.get("/", (req, res) => {
//   Race.fetchAll()
//  .then( async Race => {
//    user = await getUserLoggedIn();
//    result = JSON.parse(JSON.stringify( Race))
//    res.status(200).render('viewraces', { query: "", state: "", data: getFiltered(result, "", "All"), states: getStates(result), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn() });
//  })
//  .catch(err => {
//      console.log(err);
//      res.status(500).json(err);
//  });
// });

// router.post("/", (req, res) => {
// Race.fetchAll()
// .then( async races => {
//  user = await getUserLoggedIn();
//  result = JSON.parse(JSON.stringify( races))
//  res.status(200).render('viewraces', { query: req.body.query, 
//    state: req.body.selectpicker, 
//    data: getFiltered(result, req.body.query, req.body.selectpicker), 
//    states: getStates(result) , user:getUserLoggedIn() });
// })
// .catch(err => {
//  console.log(err);
//  res.status(500).json(err);
// });
// });

router.get("/", (req, res) => {
  let user = getUserLoggedIn();
  let responses = RaceDetails();
  res.status(200).render('viewraces', { query: "", state: "", data: getFiltered(responses, "", "All"), states: getStates(responses), races: user.races, running_groups: user.running_groups, user:user });

});

router.post("/", (req, res) => {
  Race.fetchAll()
  .then( async races => {
    user = await getUserLoggedIn();
    result = JSON.parse(JSON.stringify( races))
    res.status(200).render('viewraces', { query: req.body.query, 
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
