const express = require("express");
const router = express.Router();
const race = require("../db/models/race");

router.get("/", (req, res) => {
    race.fetchAll()
    .then(race => {
        res.status(200).render('viewraces', { data: JSON.parse(JSON.stringify(race)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/update/:id", (req, res) => {
    race.forge({ id: req.params.id })
      .save(req.body)
      .then(race => {
        res.status(200).render('race', { data: JSON.parse(JSON.stringify(race)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.get("/showbyid/:id", (req, res) => {
    race.where({ id: req.params.id })
      .fetch()
      .then(race => {
        console.log(JSON.parse(JSON.stringify(race)))
        res.status(200).render('race', { data: JSON.parse(JSON.stringify(race)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.post("/delete/:id", (req, res) => {
    race.where({ id: req.params.id })
      .fetch()
      .then(race => {
        if (!race) {
          res.status(404).json({ message: "race not found" });
        } else {
          race
            .destroy()
            .then(() => {
              res.status(200).render('index', { data: JSON.parse(JSON.stringify(race)) });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
  });
module.exports = router;
