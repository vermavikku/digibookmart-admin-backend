const dotenv = require("dotenv");
const path = require("path");

// Load the correct .env file based on the NODE_ENV value
const envFile =
  process.env.NODE_ENV === "development"
    ? ".env.development"
    : ".env.production";

// Load the environment variables
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Export the configuration values
module.exports = {
  env: process.env.NODE_ENV,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  port: process.env.PORT || 3000, // Default to port 3000 if not provided
};
