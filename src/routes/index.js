const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");
const users = require("./users.routes");
const category = require("./categories.routes");
const board = require("./boards.routes");
const medium = require("./mediums.routes");
const product = require("./products.routes");

router.use("/auth", auth);
router.use("/user", users);
router.use("/category", category);
router.use("/board", board);
router.use("/medium", medium);
router.use("/product", product);

module.exports = router;
