const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");


// User Registration.
router.post("/registerUser", user.registerUser);

// Fetch All Users.
router.get("/users", user.users);

// Authenticate an User.
router.post("/authenticateUser", user.authenticateUser);


module.exports = router;
