const multer = require("multer");
const path = require("path");
const { generateFilename } = require("../utils/filename");

const getMulterInstance = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folderPath = path.join("uploads", folderName);
      cb(null, folderPath); // Directory to save the files
    },
    filename: function (req, file, cb) {
      const filename = generateFilename(file.originalname);
      cb(null, filename); // Generate and use the filename
    },
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  };

  return multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter: fileFilter,
  });
};

module.exports = getMulterInstance;
