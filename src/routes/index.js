const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");
const users = require("./users.routes");
const category = require("./categories.routes");

router.use("/auth", auth);
router.use("/user", users);
router.use("/category", category);

module.exports = router;
