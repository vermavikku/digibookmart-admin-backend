const multer = require("multer");
const fs = require("fs");
const path = require("path");
const getMulterInstance = require("../services/upload.services");

// Middleware to handle file uploads with field-specific required options
const uploadFileMiddleware = (fieldsConfig) => {
  // Extract field names and create multer fields configuration
  const multerFields = fieldsConfig.map(({ fieldName }) => ({
    name: fieldName,
  }));

  const folderPath = path.join(
    __dirname,
    "../../uploads",
    fieldsConfig[0].folderName || ""
  );

  // Ensure the folder path exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Create a multer instance with specified folder
  const upload = getMulterInstance(fieldsConfig[0].folderName || "").fields(
    multerFields
  );

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle multer-specific errors (like file size limit)
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Handle other errors
        return res.status(400).json({ error: err.message });
      }

      // Check if required number of files are uploaded for each field
      const uploadedFiles = fieldsConfig.reduce(
        (acc, { fieldName, minFiles, required }) => {
          if (req.files[fieldName]) {
            acc[fieldName] = req.files[fieldName].map(
              (file) =>
                `/uploads/${fieldsConfig[0].folderName || ""}/${file.filename}`
            );
          } else {
            acc[fieldName] = [];
          }

          if (required && acc[fieldName].length < minFiles) {
            return res
              .status(400)
              .send(
                `Minimum ${minFiles} file(s) required for field: ${fieldName}`
              );
          }

          return acc;
        },
        {}
      );

      req.filePaths = uploadedFiles;
      next();
    });
  };
};

module.exports = uploadFileMiddleware;
