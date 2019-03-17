const express = require("express");
const router = express.Router();
const {Race} = require("../db/ready_race_run");

router.get("/", (req, res) => {
     Race.fetchAll()
    .then( Race => {
        res.status(200).render('viewraces', { data: JSON.parse(JSON.stringify( Race)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/update/:id", (req, res) => {
     Race.forge({ id: req.params.id })
      .save(req.body)
      .then( Race => {
        res.status(200).render('race', { data: JSON.parse(JSON.stringify( Race)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.get("/showbyid/:id", (req, res) => {
     Race.where({ id: req.params.id })
      .fetch()
      .then( Race => {
        console.log(JSON.parse(JSON.stringify( Race)))
        res.status(200).render('race', { data: JSON.parse(JSON.stringify( Race)) });
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
