const express = require("express");
const router = express.Router();
const {User} = require("../db/ready_race_run");
const {UserInfo, getUserLoggedIn, getUserInfo, clearUserLoggedIn} = require("./data/userData");

create = (req, res) => {
    User.forge( req.body )
    .save(req.body)
    .then(async User => {
        await UserInfo(User.id, true)
        user = await getUserLoggedIn();
        res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn() });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

update = (req, res) => {
    User.forge({id: req.params.id})
    .save(req.body)
    .then(async function(User)  {
        await UserInfo(User.id, false)
        user = await getUserInfo();
        res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn() });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

findByEmail = (req, res) => {
    User.forge().query({where:{ email: req.body.email, password: req.body.password}})
    .fetch()
    .then(async function(User)  {
        if (!User) {
            res.render('index', {data: {}, races: [], rgs: [], user:getUserLoggedIn() })
        } else {
            await UserInfo(User.id, true)
            user = await getUserLoggedIn();
            res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
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
            res.render('index', {data: {}, races: [], rgs: [], user:getUserLoggedIn() })
        } else {
            await UserInfo(User.id, false)
            user = await getUserInfo();
            res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn() });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

function logout(req, res) {
    user = clearUserLoggedIn();
    res.redirect('../')
    //res.render('index', {data: {}, races: [], rgs: [], user:getUserLoggedIn() })
};

deleteUser = (req, res) => {
    User.where({ id: req.params.id })
    .fetch()
    .then(async function(User)  {
        if (!User) {
            res.status(404).json({ message: "User not found" });
        } else {
            User
            .destroy()
            .then(() => {
                res.status(200).render('index', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:getUserLoggedIn()});
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
router.post("/:id", update);
router.post("/logout/", logout);
router.get("/:id", findById);
router.get("/delete/:id", deleteUser);
module.exports = router;
