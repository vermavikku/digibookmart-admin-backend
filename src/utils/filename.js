const path = require("path");

const generateFilename = (originalname) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return uniqueSuffix + path.extname(originalname);
};

module.exports = { generateFilename };
