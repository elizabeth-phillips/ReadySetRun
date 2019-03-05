const user = require("../db/models/user");

exports.getForm = (req, res) => {
  res.render('user/registration')
}

exports.getAll = (req, res) => {
  user.fetchAll()
    .then(user => {
      res.status(200).render('user/viewusers', { data: JSON.parse(JSON.stringify(user)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  user.forge(req.body)
    .save()
    .then(user => {
      res.status(200).render('user/profile', { data: JSON.parse(JSON.stringify(user)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  user.forge({ id: req.params.id })
    .save(req.body)
    .then(user => {
      res.status(200).render('user/profile', { data: JSON.parse(JSON.stringify(user)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.showById = (req, res) => {
  user.where({ id: req.params.id })
    .fetch()
    .then(user => {
      console.log(JSON.parse(JSON.stringify(user)))
      res.status(200).render('user/profile', { data: JSON.parse(JSON.stringify(user)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
exports.delete = (req, res) => {
  user.where({ id: req.params.id })
    .fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "user not found" });
      } else {
        user
          .destroy()
          .then(() => {
            res.status(200).render('user/profile', { data: JSON.parse(JSON.stringify(user)) });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    });
};
