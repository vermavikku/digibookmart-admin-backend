const multer = require("multer");
const path = require("path");

/**
 * Create a dynamic multer middleware
 * @param {Object} options - Configuration options
 * @param {string[]} options.allowedFileTypes - Array of allowed MIME types
 * @param {string} options.destination - Destination folder for uploads
 * @returns {Object} Multer instance with dynamic settings
 */
const upload = ({ allowedFileTypes, destination }) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination); // Set the upload destination dynamically
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    // Accept only files that match the allowed MIME types
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type! Only the following types are allowed: ${allowedFileTypes.join(
            ", "
          )}`
        ),
        false
      );
    }
  };

  return multer({ storage, fileFilter });
};

module.exports = upload;
