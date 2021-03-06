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
        var fullUrl = req.protocol + '://' + req.get('host') + '/user/' + User.id;
        res.redirect(fullUrl);
      })
      .catch(err => {
        console.log(err);
        res.redirect('back')
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

login = (req, res) => {
    User.forge().query({where:{ email: req.body.email, password: req.body.password}})
    .fetch()
    .then(async function(User)  {
        if (!User) {
            res.redirect('back')
        } else {
            await UserInfo(User.id, true);
            var fullUrl = req.protocol + '://' + req.get('host') + '/user/' + User.id;
            res.redirect(fullUrl);
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
            res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:user, future_races: user.future_races });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

logout = async (req, res) => {
    user = await clearUserLoggedIn();
    var fullUrl = req.protocol + '://' + req.get('host');
    res.redirect(fullUrl)
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
            .then(async () => {
                await UserInfo(User.id, false)
                user = await getUserInfo();
                res.status(200).render('index', { data: JSON.parse(JSON.stringify(User)), races: user.races, running_groups: user.running_groups, user:user});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        }
    });
};



router.post("/", create);
router.post("/login/", login);
router.post("/:id", update);
router.get("/logout/", logout);
router.get("/:id", findById);
router.get("/delete/:id", deleteUser);
module.exports = router;
