const httpStatus = require("http-status");
const {users} = require("../models");
const bcrypt = require("../config/crypto");

const addNewUser = async(req,res)=>{
    try {
        return res.status(httpStatus.OK).json({Message : "ok"});
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

module.exports = {
    addNewUser
}