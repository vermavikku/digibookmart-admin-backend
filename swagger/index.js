const swaggerJsdoc = require("swagger-jsdoc");

const config = require("./config.json");
const auth = require("./docs/auth.json");
const category = require("./docs/categories.json");
const board = require("./docs/boards.json");
const medium = require("./docs/mediums.json");
const product = require("./docs/products.json");

// Merge paths from each JSON file
Object.assign(
  config.paths,
  auth.paths,
  category.paths,
  board.paths,
  medium.paths,
  product.paths,
);

// Merge tags from each JSON file
config.tags = [
  ...(config.tags || []),
  ...(auth.tags || []),
  ...(category.tags || []),
  ...(board.tags || []),
  ...(medium.tags || []),
  ...(product.tags || []),
];

const options = {
  definition: config,
  apis: [], // No need to specify route files since we are directly using JSON files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
