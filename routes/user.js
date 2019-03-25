const express = require("express");
const router = express.Router();
const {User, RaceHistory, Race, RunningGroup, RunningGroupMember} = require("../db/ready_race_run");
const {Login} = require("./data/userData");
const fs = require('fs');

create = (req, res) => {
    User.forge( req.body )
    .save(req.body)
    .then(User => {
        res.status(200).render('profile', { login: false, data: JSON.parse(JSON.stringify(User)), loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

update = (req, res) => {
    User.forge({ id: req.params.id })
    .save(req.body)
    .then(User => {
        res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

findByEmail = (req, res) => {
    User.forge().query({where:{ email: req.body.email, password: req.body.password}})
    .fetch()
    .then((User) => {
        if (!User) {
            res.status(200).render('index', { });
        } else {
            if (!User) {
                res.render('index', {data:{}})
            } else {
                res.status(200).render('profile', { data: Login(User), races: User.races, rgs: User.running_groups});
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

findById = (req, res) => {
    User.forge().query({where:{ id: req.params.id}})
    .fetch()
    .then(async function(User)  {
        if (!User) {
            res.render('index', {data:{}})
        } else {
            Login(res, User)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

deleteUser = (req, res) => {
    User.where({ id: req.params.id })
    .fetch()
    .then(User => {
        if (!User) {
            res.status(404).json({ message: "User not found" });
        } else {
            User
            .destroy()
            .then(() => {
                res.status(200).render('index', { data: JSON.parse(JSON.stringify(User)), loggedIn: true});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        }
    });
};

router.post("/", create);
router.post("/login/", findByEmail);
router.post("/profile/:id", update);
router.get("/profile/:id", findById);
router.get("/delete/:id", deleteUser);
module.exports = router;
