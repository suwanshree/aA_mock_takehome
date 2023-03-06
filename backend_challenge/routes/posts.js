const express = require("express");
const { Post } = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils/async");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

const router = express.Router();

const postValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Title"),
  check("coffee")
    .exists({ checkFalsy: true })
    .withMessage("Please provide the Coffee"),
  check("text")
    .exists({ checkFalsy: true })
    .withMessage("Please provide text for the Post"),
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Rating"),
  handleValidationErrors,
];

// Ping route
router.get(
  "/ping",
  asyncHandler(async (req, res) => {
    return res.json({ status: "good" });
  })
);

// index of all posts - default asc by post date
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allPosts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.json(allPosts);
  })
);

// Returns single post with matching id
router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    return res.json(post);
  })
);

// Creates a new post and returns it
router.post(
  "/",
  csrfProtection,
  postValidators,
  asyncHandler(async (req, res) => {
    const { title, coffee, text, rating } = req.body;
    const newPost = await Post.writePost({
      title,
      coffee,
      text,
      rating,
    });
    const data = newPost.dataValues;
    return res.json({
      data,
      csrfToken: req.csrfToken(),
    });
  })
);

// Destroys a post in the database - returns if deletion was a success
router.delete(
  "/delete/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    await post.destroy({ where: { id: postId } });
    return res.json({ id: postId });
  })
);

module.exports = router;
