const express = require("express");
const router = express.Router();
const { auth, users } = require("../controllers");

router.post("/register",users.addNewUser);

module.exports = router;