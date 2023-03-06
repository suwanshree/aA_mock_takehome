const express = require("express");
const router = express.Router();
const coffeesRouter = require("./coffees.js");
const postsRouter = require("./posts.js");

router.use("/coffee", coffeesRouter);
router.use("/post", postsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
