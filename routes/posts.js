const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authenticateUser = require("./middleware/authentication");
const beautify = require("js-beautify").js;

// BEAUTIFY HELPER FUNCTION

const captureContent = (text) => {
  // Captures code snippets
  const regex = /\[c]([\s\S]*?)\[\/c]/g;

  // Match code
  let matched = text.matchAll(regex);
  const beautyMatches = [...matched].map((d) => beautify(d[1]));

  return beautyMatches;
};

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
router.post("/", authenticateUser, async (req, res) => {

  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    code: captureContent(req.body.description),
  });

  try {
    await post.save();
    res.status(200).json({ message: "Post saved!" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// DELETE A POST
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: `Post ${req.params.id} removed!` });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// UPDATE A SINGLE POST
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          code: captureContent(req.body.description),
        },
      }
    );
    res.status(204).json({ message: `Post ${req.params.id} updated!` });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
