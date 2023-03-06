const express = require("express");
const router = express.Router();
const coffeesRouter = require("./coffees.js");
const postsRouter = require("./posts.js");

router.use("/coffee", coffeesRouter);
router.use("/post", postsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(201).json({});
  });
}

module.exports = router;
