const express = require("express");
const router = express.Router();
const {RunningGroup} = require("../db/ready_race_run");

router.get("/", (req, res) => {
    RunningGroup.fetchAll()
    .then(RunningGroup => {
        res.status(200).render('allrunninggroups', { data: JSON.parse(JSON.stringify(RunningGroup)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/create/", (req, res) => {
    res.render('admin/createrunninggroup')
});

router.post("/create", (req, res) => {
  RunningGroup.forge(req.body)
    .save()
    .then(RunningGroup => {
      console.log("Running group info", RunningGroup)
      res.status(200).render('runninggroup', { data: JSON.parse(JSON.stringify(RunningGroup)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/update/:id", (req, res) => {
    RunningGroup.forge({ id: req.params.id })
      .save(req.body)
      .then(RunningGroup => {
        res.status(200).render('allrunninggroups', { data: JSON.parse(JSON.stringify(RunningGroup)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.get("/:id", (req, res) => {
    RunningGroup.where({ id: req.params.id })
      .fetch()
      .then(RunningGroup => {
        console.log(JSON.parse(JSON.stringify(RunningGroup)))
        res.status(200).render('runninggroup', { data: JSON.parse(JSON.stringify(RunningGroup)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.post("/delete/:id", (req, res) => {
    RunningGroup.where({ id: req.params.id })
      .fetch()
      .then(RunningGroup => {
        if (!RunningGroup) {
          res.status(404).json({ message: "RunningGroup not found" });
        } else {
          RunningGroup
            .destroy()
            .then(() => {
              res.status(200).render('runninggroup', { data: JSON.parse(JSON.stringify(RunningGroup)) });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
  });
module.exports = router;
