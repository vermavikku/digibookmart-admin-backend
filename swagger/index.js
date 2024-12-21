const swaggerJsdoc = require("swagger-jsdoc");

const config = require("./config.json");
const auth = require("./docs/auth.json");


// Merge paths from each JSON file
Object.assign(
  config.paths,
  auth.paths,
);

// Merge tags from each JSON file
config.tags = [
  ...(config.tags || []),
  ...(auth.tags || []),
];

const options = {
  definition: config,
  apis: [], // No need to specify route files since we are directly using JSON files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
