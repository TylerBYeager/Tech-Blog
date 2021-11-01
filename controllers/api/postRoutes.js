const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
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
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singlePost = await Post.findOne(
            {
                where: { id: req.params.id },
                attributes: ["id", "content", "title", "created_at"],
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
        if (!singlePost) {
            res.status(404).json("Post ID does not exist. Try again");
        } else {
            res.status(200).json(singlePost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.tite,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            });
        if (!updatePost) {
            res.status(404).json("Post ID does not exist. Try again");
        } else {
            res.status(200).json(updatePost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            });
        if (!deletePost) {
            res.status(404).json("Post ID does not exist. Try again");
        } else {
            res.status(200).json(deletePost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;