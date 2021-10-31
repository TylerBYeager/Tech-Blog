const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
    User.findAll(
        {
            attributes: {
                exclude: ["password"]
            }
        })
        .then(userData => res.json(userData));

});

router.get("/:id", (req, res) => {
    User.findOne(
        {
            attributes: {
                exclude: ["password"],
            },
            where: {
                id: req.params.id
            },
            include: [{
                model: Post,
                attributes: ["id", "title", "content"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text"],
            }
            ]
        })
        .then(singleUser => {
            res.json(singleUser);
        });
});

router.post("/", (req, res) => {
    User.create(
        {
          username: req.body.username,
          password: req.body.password  
        })
        .then(newUser => {
            res.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;
                res.json(newUser);
            });
        });
});


module.exports = router;