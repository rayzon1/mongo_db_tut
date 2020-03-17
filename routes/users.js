const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const authenticateUser = require("./middleware/authentication");

// GET ALL USERS
router.get("/", authenticateUser, async (req,res) => {
    res.status(200).json({message: "Sign in Successfull"});
});

module.exports = router;