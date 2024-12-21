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
    const { user_name, password } = trim_values(req.body);

    if (!user_name.trim() || !password.trim()) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ Message: "Username and Password Required" });
    }

    const checkUser = await users.checkUserByCondition(
      {
        user_name: user_name,
        user_type: "admin",
      }
    );

    if (Object.keys(checkUser).length == 0) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "Invalid Username or Password" });
    }

    const verifyPassword = await bcrypt.verify(
      password,
      checkUser.password
    );
    if (!verifyPassword) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ Message: "Invalid Username or Password" });
    }

    let userData = {user_name : checkUser.user_name,user_type : checkUser.user_type};

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

const registerNewUser = async(req,res)=>{
  try {

    const info = trim_values(req.body);

    if(Object.keys(info).length == 0){
      return res.status(httpStatus.BAD_REQUEST).json({Message : "please provide valid information"});
    }

    const encryptedPass = await bcrypt.encrypt(info.password);

    if(!encryptedPass){
      return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to add user information"});
    }

    const added = await users.insertUser({...info,password : encryptedPass});

    if(!added){
      return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to add user information"});
    }

    return res.status(httpStatus.CREATED).json({Message : "user created successfully"});
    
  } catch (error) {
    console.log(error);
    if(error.message.includes("Conflict")){
      return res.status(httpStatus.CONFLICT).json({Message : "user with this username already exists"});
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
  }
}

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
  verifyEmail,
  resetPassword,
  registerNewUser
};
