const express = require("express");
const router = express.Router();
const user = require("../db/models/user");


  
create = (req, res) => {
    user.forge( req.body )
    .save(req.body)
    .then(user => {
        res.status(200).render('profile', { login: false, data: JSON.parse(JSON.stringify(user)) });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

// loginPage = (req, res) => {
//     res.render('profile', { data: {login: true} })
// }

update = (req, res) => {
    user.forge({ id: req.params.id })
    .save(req.body)
    .then(user => {
        res.status(200).render('profile', { data: JSON.parse(JSON.stringify(user)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

findByEmail = (req, res) => {
    user.forge().query({where:{ email: req.query.email}})
    .fetch()
    .then((user) => {
        if (!user) {
            res.status(404).render('index', { data: JSON.parse(JSON.stringify(user)) });
        } else {
            console.log(user)
            res.status(200).render('profile', { data: JSON.parse(JSON.stringify(user)) });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

findById = (req, res) => {
    user.forge().query({where:{ id: req.params.id}})
    .fetch() //{withRelated: ['races']}
    .then((user) => {
        if (!user) {
            res.render('index', { data: {login: false} })
            // res.status(404).json({ message: `user with id: ${req.params.id} not found` });
        } else {
            res.status(200).render('profile', { data: JSON.parse(JSON.stringify(user)) });
        }
    })
    .catch(err => {
        console.log(user, err);
        res.status(500).json(err);
    });
};

deleteUser = (req, res) => {
    user.where({ id: req.params.id })
    .fetch()
    .then(user => {
        if (!user) {
            res.status(404).json({ message: "user not found" });
        } else {
            user
            .destroy()
            .then(() => {
                res.status(200).render('index', { data: JSON.parse(JSON.stringify(user)) });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        }
    });
};

router.post("/", create);
router.post("/profile/:id", update);
router.get("/profile/:id", findById);
router.get("/login/", findByEmail);
router.get("/delete/:id", deleteUser);
module.exports = router;
