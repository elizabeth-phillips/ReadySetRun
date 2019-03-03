const runningGroupMemberMember = require("../db/models/running_group_member");

exports.getForm = (req, res) => {
  res.render('running_group_member/viewform')
}

exports.getAll = (req, res) => {
  runningGroupMemberMember.fetchAll()
    .then(runningGroupMemberMember => {
      res.status(200).render('running_group_member/viewrunninggroupmember', { data: JSON.parse(JSON.stringify(runningGroupMemberMember)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  runningGroupMemberMember.forge(req.body)
    .save()
    .then(runningGroupMember => {
      res.status(200).render('running_group_member/viewbyid', { data: JSON.parse(JSON.stringify(runningGroupMember)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  runningGroupMember.forge({ id: req.params.id })
    .save(req.body)
    .then(runningGroupMember => {
      res.status(200).render('running_group_member/viewbyid', { data: JSON.parse(JSON.stringify(runningGroupMember)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.showById = (req, res) => {
  runningGroupMember.where({ id: req.params.id })
    .fetch()
    .then(runningGroupMember => {
      console.log(JSON.parse(JSON.stringify(runningGroupMember)))
      res.status(200).render('running_group_member/viewbyid', { data: JSON.parse(JSON.stringify(runningGroupMember)) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
exports.delete = (req, res) => {
  runningGroupMember.where({ id: req.params.id })
    .fetch()
    .then(runningGroupMember => {
      if (!runningGroupMember) {
        res.status(404).json({ message: "runningGroupMember not found" });
      } else {
        runningGroupMember
          .destroy()
          .then(() => {
            res.status(200).render('running_group_member/viewbyid', { data: JSON.parse(JSON.stringify(runningGroupMember)) });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    });
};
