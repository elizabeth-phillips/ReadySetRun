const raceHistory = require("../db/models/race_history");

exports.getForm = (req, res) => {
  res.render('race_history/viewform')
}

exports.getAll = (req, res) => {
  raceHistory.fetchAll()
    .then(raceHistory => {
      res.status(200).render('race_history/viewracehistory', { data: JSON.parse(JSON.stringify(raceHistory)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  raceHistory.forge(req.body)
    .save()
    .then(raceHistory => {
      res.status(200).render('race_history/viewbyid', { data: JSON.parse(JSON.stringify(raceHistory)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  raceHistory.forge({ id: req.params.id })
    .save(req.body)
    .then(raceHistory => {
      res.status(200).render('race_history/viewbyid', { data: JSON.parse(JSON.stringify(raceHistory)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.showById = (req, res) => {
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
};
exports.delete = (req, res) => {
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
};
