const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                attributes: ["id", "title", "content", "created_at"],
                include: [
                    {
                        model: Comment,
                        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                        include: {
                            model: User,
                            attributes: ["username"]
                        }
                    }
                ]
            });
        const posts = postData.map(post => post.get({ plain: true }));
        res.status(200).render("homepage", { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get("/post/:id", async (req, res) => {
    try {
        const onePost = await Post.findOne(
            {
                where: { id: req.params.id },
                attributes: ["id", "content", "title", "created_at"],
                include: [
                    {
                        model: Comment,
                        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                        include: {
                            model: User,
                            attributes: ["username"]
                        }
                    },
                    {
                        model: User,
                        attributes: ["username"]
                    }
                ]
            });
        if (!onePost) {
            res.status(404).json("Post does not exist. Try again");
            return;
        } else {
            const post = onePost.get({ plain: true});
            console.log(post);
            res.status(200).render("one-post", { post, loggedIn: req.session.loggedIn });
        }
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
}); //existing bug needs fixed

module.exports = router;