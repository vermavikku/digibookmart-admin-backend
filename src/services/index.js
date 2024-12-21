const emailService = require("./email_verifier.services");
const otpService = require("./otp.services");
const settingService = require("./setting.services");
const uploadService = require("./upload.services");
const socketService = require("./socket.services");
const multerService = require("./multer.services");
module.exports = {
  emailService,
  otpService,
  settingService,
  uploadService,
  socketService,
  multerService,
};
