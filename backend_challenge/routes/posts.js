const express = require("express");
const { Post } = require("../db/models");
const { asyncHandler } = require("../utils/async");
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
    const order = req.query.order === "DESC" ? "DESC" : "ASC";
    const allPosts = await Post.findAll({
      order: [["createdAt", order]],
    });
    return res.json(allPosts);
  })
);

// return all posts with coffee having a matching id
router.get(
  "/coffee",
  asyncHandler(async (req, res) => {
    const { id } = req.query;
    let allPosts;
    if (id) {
      allPosts = await Post.findAll({
        where: {
          coffee: id,
        },
        order: [["createdAt", "DESC"]],
      });
    } else {
      return res
        .status(400)
        .json({ error: "Please provide a valid id or name" });
    }
    return res.json(allPosts);
  })
);

// Returns single post with matching id
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    return res.json(post);
  })
);

// Creates a new post and returns it
router.post(
  "/",
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
    });
  })
);

// Destroys a post in the database - returns if deletion was a success
router.delete(
  "/delete/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    await post.destroy({ where: { id: postId } });
    return res.json({ status: "Deletion Success!" });
  })
);

module.exports = router;
