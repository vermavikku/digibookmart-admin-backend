const otpUtils = require("../utils/otp");
const emailUtils = require("../utils/email");

exports.sendOTP = async (email, data) => {
  const otp = otpUtils.generateOTP();
  otpUtils.storeOTP(email, otp);
  const sent = await emailUtils(email, { ...data, otp: otp });
  if (sent) {
    return true;
  } else {
    return false;
  }
};

exports.verifyOTP = (email, otp) => {
  return otpUtils.validateOTP(email, otp);
};
