const runningGroup = require("../db/models/running_group");

exports.getForm = (req, res) => {
  res.render('running_group/viewform')
}

exports.getAll = (req, res) => {
  runningGroup.fetchAll()
    .then(runningGroup => {
      res.status(200).render('running_group/viewrunninggroup', { data: JSON.parse(JSON.stringify(runningGroup)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  runningGroup.forge(req.body)
    .save()
    .then(runningGroup => {
      res.status(200).render('running_group/viewbyid', { data: JSON.parse(JSON.stringify(runningGroup)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  runningGroup.forge({ id: req.params.id })
    .save(req.body)
    .then(runningGroup => {
      res.status(200).render('running_group/viewbyid', { data: JSON.parse(JSON.stringify(runningGroup)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.showById = (req, res) => {
  runningGroup.where({ id: req.params.id })
    .fetch()
    .then(runningGroup => {
      console.log(JSON.parse(JSON.stringify(runningGroup)))
      res.status(200).render('running_group/viewbyid', { data: JSON.parse(JSON.stringify(runningGroup)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
exports.delete = (req, res) => {
  runningGroup.where({ id: req.params.id })
    .fetch()
    .then(runningGroup => {
      if (!runningGroup) {
        res.status(404).json({ message: "runningGroup not found" });
      } else {
        runningGroup
          .destroy()
          .then(() => {
            res.status(200).render('running_group/viewbyid', { data: JSON.parse(JSON.stringify(runningGroup)) });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    });
};
