const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
const { update } = require('../../models/User');
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
                user_id: req.body.user_id //replace body with session
            });
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateComment = await Comment.update(
            {
                comment_text: req.body.comment_text
            },
            {
                where: {
                    id: req.params.id
                }
            });
        if (!updateComment) {
            res.status(404).json("Comment ID does not exist. Please try again");
        } else {
            res.status(200).json(updateComment);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteComment = await Comment.destroy(
            {
                where: {
                    id: req.params.id
                }
            });
        if (!deleteComment) {
            res.status(404).json("Comment ID does not exist. Please try again");
        } else {
            res.status(200).json(deleteComment);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;