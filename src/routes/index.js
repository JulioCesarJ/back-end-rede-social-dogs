const express = require("express");

const router = express.Router();

// Controllers
const getUser = require("../controllers/users/GetUser");
const registerUser = require("../controllers/users/Registeruser");
const signIn = require("../controllers/users/Signin");

// Middleware
const checkToken = require('../middleware/checkToken')

router.get("/user", checkToken, getUser);
router.post("/auth/register", registerUser);
router.post("/auth/login", signIn);

module.exports = router;
