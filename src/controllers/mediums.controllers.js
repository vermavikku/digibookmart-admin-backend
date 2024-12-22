const httpStatus = require("http-status");
const {medium} = require("../models");
const trim_values = require("../utils/trim_values");

const addNewMedium= async(req,res)=>{
    try {
        const info = trim_values(req.body);

        console.log(info);
        
        
        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid Medium Information"});
        }

        const added = await medium.insertMedium(info);

        if(!added){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to add Medium info"});
        }

        return res.status(httpStatus.CREATED).json({Message : "Medium info added successfully"});


    }  catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Medium with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
      }
}

const updateMedium = async(req,res)=>{
    try {

        const code = req.params.medium_code;
        const info = req.body;

        const checkMedium = await medium.checkMediumByCondition({medium_code : code});

        if(!checkMedium){
            return res.status(httpStatus.NOT_FOUND).json({Message : `Medium with code ${code} not exists`});
        }

        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid Medium Information"});
        }

        const updateInfo = await medium.updateMediumByCondition(info,{medium_code : code});

        if(!updateInfo){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to update Medium info"});
        }
        
        return res.status(httpStatus.OK).json({Message : "Medium info updated successfully"});


    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Medium with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getMediumByCode = async(req,res)=>{
    try {

        const code = req.params.medium_code;

        const checkMedium = await medium.checkMediumByCondition({medium_code : code});

        if(!checkMedium){
            return res.status(httpStatus.NOT_FOUND).json({Message : `Medium with code ${code} not exists`});
        }
        
        return res.status(httpStatus.OK).json(checkMedium);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Medium with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getAllMediums = async(req,res)=>{
    try {

        const checkMedium = await medium.getMediums();

        return res.status(httpStatus.OK).json(checkMedium);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Medium with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}


const deleteMediumByCode = async(req,res)=>{
    try {

        const code = req.params.medium_code;

        const checkMedium = await medium.checkMediumByCondition({medium_code : code});

        if(!checkMedium){
            return res.status(httpStatus.NOT_FOUND).json({Message : `Medium with code ${code} not exists`});
        }

        const deleted = await medium.deleteMediumByCondition({medium_code : code});

        if(!deleted){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Unable to delete Medium"});
        }
        
        return res.status(httpStatus.OK).json({Message :"Medium Delete Successfully"});

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Medium with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

module.exports = {
    addNewMedium,
    updateMedium,
    getMediumByCode,
    getAllMediums,
    deleteMediumByCode
}
