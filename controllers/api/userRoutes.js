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

router.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.loggedIn = true;
            res.json(newUser);
        });
    } catch (err) {
        console.log("error from creating user", err)
        res.json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, try again" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, try again" });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: "Successfully logged in" });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;