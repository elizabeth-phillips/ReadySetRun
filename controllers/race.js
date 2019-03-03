const race = require("../db/models/race");

exports.getForm = (req, res) => {
  res.render('race/viewform')
}

exports.getAll = (req, res) => {
  race.fetchAll()
    .then(race => {
      res.status(200).render('race/viewrace', { data: JSON.parse(JSON.stringify(race)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  race.forge(req.body)
    .save()
    .then(race => {
      res.status(200).render('race/viewbyid', { data: JSON.parse(JSON.stringify(race)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  race.forge({ id: req.params.id })
    .save(req.body)
    .then(race => {
      res.status(200).render('race/viewbyid', { data: JSON.parse(JSON.stringify(race)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.showById = (req, res) => {
  race.where({ id: req.params.id })
    .fetch()
    .then(race => {
      console.log(JSON.parse(JSON.stringify(race)))
      res.status(200).render('race/viewbyid', { data: JSON.parse(JSON.stringify(race)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
exports.delete = (req, res) => {
  race.where({ id: req.params.id })
    .fetch()
    .then(race => {
      if (!race) {
        res.status(404).json({ message: "race not found" });
      } else {
        race
          .destroy()
          .then(() => {
            res.status(200).render('race/viewbyid', { data: JSON.parse(JSON.stringify(race)) });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    });
};
