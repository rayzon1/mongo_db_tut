const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GETS ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ error });
  }
});

// GET SPECIFIC POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.json({ error });
  }
});

// SUBMITS A POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    await post.save();
    res.status(200).json({ message: "Post saved!" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    await Post.remove({ _id: req.params.id });
    res.json({ message: `Post ${req.params.id} removed!` });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// UPDATE A POST
router.patch("/:id", async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.status(204);
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
