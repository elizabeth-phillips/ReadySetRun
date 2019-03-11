const express = require("express");
const router = express.Router();
const runningGroup = require("../db/models/running_group");

router.get("/", (req, res) => {
    runningGroup.fetchAll()
    .then(runningGroup => {
        res.status(200).render('allrunninggroups', { data: JSON.parse(JSON.stringify(runningGroup)) });
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
  runningGroup.forge(req.body)
    .save()
    .then(runningGroup => {
      console.log("Running group info", runningGroup)
      res.status(200).render('runninggroup', { data: JSON.parse(JSON.stringify(runningGroup)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/update/:id", (req, res) => {
    runningGroup.forge({ id: req.params.id })
      .save(req.body)
      .then(runningGroup => {
        res.status(200).render('allrunninggroups', { data: JSON.parse(JSON.stringify(runningGroup)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.get("/:id", (req, res) => {
    runningGroup.where({ id: req.params.id })
      .fetch()
      .then(runningGroup => {
        console.log(JSON.parse(JSON.stringify(runningGroup)))
        res.status(200).render('runninggroup', { data: JSON.parse(JSON.stringify(runningGroup)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.post("/delete/:id", (req, res) => {
    runningGroup.where({ id: req.params.id })
      .fetch()
      .then(runningGroup => {
        if (!runningGroup) {
          res.status(404).json({ message: "runningGroup not found" });
        } else {
          runningGroup
            .destroy()
            .then(() => {
              res.status(200).render('runninggroup', { data: JSON.parse(JSON.stringify(runningGroup)) });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
  });
module.exports = router;
