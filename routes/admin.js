const express = require("express");
const router = express.Router();
const user = require("../db/models/user");

getAllUsers = (req, res) => {
    user.fetchAll()
    .then(users => {
        res.status(200).render('admin/viewusers', { data: JSON.parse(JSON.stringify(users)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

getPanel = (req, res) => {
    user.fetchAll()
    .then(users => {
        res.status(200).render('admin/panel', { data: JSON.parse(JSON.stringify(users)) });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

router.get("/", getPanel);
router.get("/users", getAllUsers);

module.exports = router;
