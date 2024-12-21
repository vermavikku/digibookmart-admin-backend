const express = require("express");
const router = express.Router();
const { auth, users } = require("../controllers/index");

router.post("/login", auth.userLogin);

router.post("/admin/login", auth.adminLogin);

router.post("/register", users.addUsers);

router.post("/verify", auth.verifyEmail);

router.put("/reset", auth.resetPassword);

module.exports = router;
