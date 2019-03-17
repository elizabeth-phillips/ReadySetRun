const express = require("express");
const router = express.Router();
const {User, RaceHistory, Race, RunningGroup, RunningGroupMember} = require("../db/ready_race_run");

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
            console.log(User)
            res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), loggedIn: true });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

findById = (req, res) => {
    console.log("Made it here")
    User.forge().query({where:{ id: req.params.id}})
    .fetch()
    .then((User) => {
        if (!User) {
            res.render('index', {})
        } else {
            hist_res = []
            rgs = []
            RunningGroupMember.forge().query({where: {user_id: User.id}}).fetchAll().then(
                groups => {
                    const result = []
                    for(let i = 0; i < groups.models.length; i++){
                        RunningGroup.forge().query({where: {id: groups.models[i].attributes.running_group_id}}).fetch().then(
                            rg => {
                                let r = {
                                    rg_id: rg.attributes.id,
                                    name: rg.attributes.name,
                                    phone: rg.attributes.phone,
                                    pace: rg.attributes.pace,
                                    city: rg.attributes.city,
                                    state: rg.attributes.state,
                                    zipcode: rg.attributes.zipcode
                                }
                                hist_res.push(r)
                            }
                        )
                    }
                }
            )
            RaceHistory.forge().query({where: {user_id: User.id}}).fetchAll().then(
                history => {
                    for(let i = 0; i < history.models.length; i++){
                        Race.forge().query({where: {id: history.models[i].attributes.race_id}}).fetch().then(
                            race => {
                                let r = {
                                    pace: history.models[i].attributes.pace, 
                                    ranking: history.models[i].attributes.ranking,
                                    name: race.attributes.name,
                                    date: race.attributes.date,
                                    distance: race.attributes.distance,
                                    email: race.attributes.email,
                                    phone: race.attributes.phone,
                                    city: race.attributes.city,
                                    state: race.attributes.state,
                                    zipcode: race.attributes.zipcode,
                                    race_id: race.attributes.id
                                }
                                hist_res.push(r)
                            }
                        ).catch(err => {
                            console.log(err);
                            res.status(500).json(err);
                        })
                    }
                    
                    
                    res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: hist_res, rgs: rgs});
                    // races = JSON.parse(JSON.stringify(RaceHistory))
                    // Race.forge().query({where: {id: RaceHistory.race_id}}).fetch().then(race => {
                    //     res.status(200).render('profile', { data: JSON.parse(JSON.stringify(User)), races: race });
                    // })
                }
            ).catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
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
