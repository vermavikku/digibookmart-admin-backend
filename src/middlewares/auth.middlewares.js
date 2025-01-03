const httpStatus = require("http-status");
const jwt = require("../config/jwt");
const { role_master } = require("../models");
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  try {
    const decoded = await jwt.verifyToken(token);

    if (
      req.headers.hasOwnProperty("role_code") &&
      req.headers.role_code != "null"
    ) {
      const code = req.headers.role_code;

      const check = await role_master.checkRoleCode(code);

      if (!check) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: `invalid role code ${code}` });
      }
      req.role_code = code;
    }

    req.userData = decoded;
    next();
  } catch (error) {
    if (error.message === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

module.exports = authMiddleware;
