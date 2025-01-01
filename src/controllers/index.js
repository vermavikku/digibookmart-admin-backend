
const auth = require("./auth.controllers");
const users = require("./users.controllers");
const category = require("./categories.controllers");
const board = require("./boards.controllers");
const medium = require("./mediums.controllers");
const product = require("./products.controllers");

module.exports = {
  category,
  auth,
  users,
  board,
  medium,
  product
};
