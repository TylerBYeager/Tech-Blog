const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.findAll(
            {
                where: {
                    user_id: req.session.user_id
                },
                attributes: ["id", "title", "content", "created_at"],
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
        const posts = allPosts.map(post => post.get({ plain: true }));
        res.status(200).render("dashboard", { posts, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const updatePost = await Post.findOne(
            {
                where: {
                    id: req.params.id
                },
                attributes: ["id", "title", "content", "created_at"],
                include: [
                    {
                        model: User,
                        attributes: ["username"]
                    },
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
        if (!updatePost) {
            res.status(404).json("Sorry. Looks like that post doesn't exist");
        } else {
            const update = updatePost.get({ plain: true });
            res.status(200).render("edit", { post, loggedIn: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

res.get("/new", async (req, res) => {
    res.render("new-post");
});

module.exports = router;