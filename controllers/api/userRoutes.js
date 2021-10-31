const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
    User.findAll()
    .then(userData => res.json(userData));
    
});


module.exports = router;