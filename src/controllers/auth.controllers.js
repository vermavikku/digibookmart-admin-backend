const httpStatus = require("http-status");
const { users } = require("../models/index");
const jwt = require("../config/jwt");
const bcrypt = require("../config/crypto");
const otpService = require("../services/otp.services");
const emailExist = require("../services/email_verifier.services");
const trim_values = require("../utils/trim_values");

const validatePassword = (password) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!#%&*])[A-Za-z\d@!#%&*]{8,20}$/;

  return regex.test(password);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobileNumber = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = trim_values(req.body);

    if (!username.trim() || !password.trim()) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ Message: "Username and Password Required" });
    }

    const checkUser = await users.selectSingleUser(
      {
        user_name: username.trim(),
        status: "Active",
      },
      ["user_name", "password", "user_id", "center_code", "email"]
    );

    if (checkUser.length == 0) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "Invalid Username or Password" });
    }

    const checkRole = await user_role.getUserRoleByUserName(username);

    if (checkRole.length == 0) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: `user ${username} doesn't have any role` });
    }
    let roles = [];
    checkRole.map((element) => {
      roles.push(element.role_type);
    });

    if (roles.includes("C")) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: `invalid username or password` });
    }

    const verifyPassword = await bcrypt.verify(
      password.trim(),
      checkUser[0].password
    );
    if (!verifyPassword) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "Invalid Username or Password" });
    }
    let userData = {};

    for (let i = 0; i < Object.keys(checkUser[0]).length; i++) {
      const key = Object.keys(checkUser[0])[i];
      if (key != "password") {
        userData[key] = checkUser[0][key];
      }
    }

    const token = await jwt.generateToken(userData);
    let finalResult = { token: token };

    console.log(roles[0]);

    const loginDetails = [
      username,
      checkUser[0].email,
      password,
      "192.168.1.1",
      "E24",
      token,
      "",
      "2024-12-13T14:00:00Z",
      101,
      checkUser[0].user_id,
    ];

    const addLogInDetails = await login_master.addLoginMasterData(loginDetails);

    if (!addLogInDetails) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "unable to login" });
    }

    return res.status(httpStatus.OK).json(finalResult);
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "Username and Password Required" });
    }

    const checkUser = await users.selectSingleUser(
      {
        user_name: username.trim(),
        status: "Active",
      },
      ["user_name", "password", "user_id", "center_code"]
    );

    if (checkUser.length == 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ Message: "Invalid Username or Password" });
    }

    const checkRole = await user_role.getUserRoleByUserName(username);

    if (checkRole.length == 0) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: `user ${username} doesn't have any role` });
    }
    let roles = [];
    checkRole.map((element) => {
      roles.push(element.role_type);
    });

    if (roles.includes("E")) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: `invalid username or password` });
    }

    const verifyPassword = await bcrypt.verify(
      password.trim(),
      checkUser[0].password
    );
    if (!verifyPassword) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ Message: "Invalid Username or Password" });
    }
    let userData = {};

    for (let i = 0; i < Object.keys(checkUser[0]).length; i++) {
      const key = Object.keys(checkUser[0])[i];
      if (key != "password") {
        userData[key] = checkUser[0][key];
      }
    }

    userData = { ...userData, role_code: "SUPERADMIN" };

    const token = await jwt.generateToken(userData);
    let finalResult = { token: token };

    return res.status(httpStatus.OK).json(finalResult);
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: "please enter valid email",
      });
    }
    const checkEmail = await emailExist(email);
    if (!checkEmail) {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: "please enter working email",
      });
    }

    if (!email.trim()) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: "Username Required" });
    }

    const checkUser = await users.selectSingleUser(
      {
        email: email.trim(),
        status: "Active",
      },
      ["name"]
    );
    if (checkUser.length == 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ Message: "Invalid Email" });
    }
    const sedMail = await otpService.sendOTP(email, checkUser[0]);

    if (sedMail) {
      return res
        .status(httpStatus.OK)
        .json({ Message: `OTP successfully sent to ${email} this mail` });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ Message: `Unable to Send Mail` });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, email, otp } = req.body;

    if (!validateEmail(email)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: "please enter valid email",
      });
    }
    if (!emailExist(email)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: "please enter working email",
      });
    }
    if (!validatePassword(password)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: `Invalid password. Password must be 8-20 characters long and include at least one uppercase letter,
           one lowercase letter,
           one digit, and one special character (@,!,#,%,&,*)`,
      });
    }
    const isValid = await otpService.verifyOTP(email, otp);
    if (!isValid) {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: "invalid otp ! please enter valid otp",
      });
    }
    const newPassword = await bcrypt.encrypt(password);
    const resetPass = await users.updateUsers(
      { password: newPassword },
      { email: email }
    );
    if (resetPass > 0) {
      return res.status(httpStatus.OK).json({
        Message: "password reset successfully",
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        Message: "unable to reset password",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Internal Server Error" });
  }
};

module.exports = {
  userLogin,
  adminLogin,
  verifyEmail,
  resetPassword,
};
