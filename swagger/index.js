const swaggerJsdoc = require("swagger-jsdoc");

const config = require("./config.json");
const auth = require("./docs/auth.json");
const category = require("./docs/categories.json");

// Merge paths from each JSON file
Object.assign(
  config.paths,
  auth.paths,
  category.paths,
);

// Merge tags from each JSON file
config.tags = [
  ...(config.tags || []),
  ...(auth.tags || []),
  ...(category.tags || []),
];

const options = {
  definition: config,
  apis: [], // No need to specify route files since we are directly using JSON files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
