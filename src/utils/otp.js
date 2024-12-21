exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otpStore = new Map();

exports.storeOTP = (email, otpValue) => {
  otpStore.set(email, {
    otpValue,
    expiresAt: Date.now() + 300000,
  });
};

exports.validateOTP = (email, checkOtp) => {
  const otpEntry = otpStore.get(email);
  if (!otpEntry) {
    return false;
  }

  const { otpValue, expiresAt } = otpEntry;
  if (Date.now() > expiresAt) {
    otpStore.delete(email);
    return false;
  }

  if (otpValue === checkOtp) {
    otpStore.delete(email);
    return true;
  }

  return false;
};
