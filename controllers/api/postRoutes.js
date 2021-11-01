const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                attributes: ["id", "title", "content", "created_at"],
                order: ["created_at"],
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
        res.status(200).json(singlePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;