const express = require("express");

const router = express.Router();

// Controllers
const getUser = require("../controllers/users/GetUser");
const registerUser = require("../controllers/users/Registeruser");
const signIn = require("../controllers/users/Signin");

router.get("/", getUser);
router.post("/auth/register", registerUser);
router.post("/auth/login", signIn);

module.exports = router;
