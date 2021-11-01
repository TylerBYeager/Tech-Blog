const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
// const withAuth = require("../../utils/auth");
//add with aut back into functions /:id and post
router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singleComment = await Comment.findOne(
            {
                where: {
                    id: req.params.id
                }
            });
        if (!singleComment) {
            res.status(404).json("Whoops! Looks like that comment doesn't exist. Try again");
        } else {
            res.status(200).json(singleComment);
        }
    } catch {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create(
            {
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;