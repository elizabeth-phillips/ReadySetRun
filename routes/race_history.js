const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    raceHistory.fetchAll()
    .then(raceHistory => {
        res.status(200).render('viewracehistory', { data: JSON.parse(JSON.stringify(raceHistory)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/create/", (req, res) => {
    res.render('race_history/viewform')
});

router.post("/create/", (req, res) => {
    raceHistory.forge(req.body)
      .save()
      .then(raceHistory => {
        res.status(200).render('race_history/viewbyid', { data: JSON.parse(JSON.stringify(raceHistory)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.post("/update/:id", (req, res) => {
    raceHistory.forge({ id: req.params.id })
      .save(req.body)
      .then(raceHistory => {
        res.status(200).render('race_history/viewbyid', { data: JSON.parse(JSON.stringify(raceHistory)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.get("/showbyid/:id", (req, res) => {
    raceHistory.where({ id: req.params.id })
      .fetch()
      .then(raceHistory => {
        console.log(JSON.parse(JSON.stringify(raceHistory)))
        res.status(200).render('race_history/viewbyid', { data: JSON.parse(JSON.stringify(raceHistory)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.post("/delete/:id", (req, res) => {
    raceHistory.where({ id: req.params.id })
      .fetch()
      .then(raceHistory => {
        if (!raceHistory) {
          res.status(404).json({ message: "raceHistory not found" });
        } else {
          raceHistory
            .destroy()
            .then(() => {
              res.status(200).render('race_history/viewbyid', { data: JSON.parse(JSON.stringify(raceHistory)) });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
  });
module.exports = router;
