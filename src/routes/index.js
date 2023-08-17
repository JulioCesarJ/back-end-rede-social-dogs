const express = require("express");

const router = express.Router();

// Controllers
const getUser = require("../controllers/users/GetUser");
const registerUser = require("../controllers/users/Registeruser");

router.get("/", getUser);
router.post("/auth/register", registerUser);

module.exports = router;
