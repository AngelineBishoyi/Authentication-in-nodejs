const express = require("express");
const {authenticationtoken} = require("../middleware/authMiddleware.js");

const userrouter = express.Router();

// Protected Route: Access Only If Logged In
userrouter.get("/profile", authenticationtoken, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = userrouter;
