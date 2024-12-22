const express = require("express");
const router = express.Router();
const { auth } = require("../controllers/index");

router.post("/login", auth.userLogin);

router.post("/register", auth.registerNewUser);

router.put("/reset", auth.resetPassword);

module.exports = router;
