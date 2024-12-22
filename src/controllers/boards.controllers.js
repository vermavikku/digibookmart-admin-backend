const httpStatus = require("http-status");
const {board} = require("../models");
const trim_values = require("../utils/trim_values");

const addNewBoard = async(req,res)=>{
    try {
        const info = trim_values(req.body);

        console.log(info);
        
        
        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid Board Information"});
        }

        const added = await board.insertBoard(info);

        if(!added){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to add Board info"});
        }

        return res.status(httpStatus.CREATED).json({Message : "Board info added successfully"});


    }  catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Board with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
      }
}

const updateBoard = async(req,res)=>{
    try {

        const code = req.params.board_code;
        const info = req.body;

        const checkBoard = await board.checkBoardByCondition({board_code : code});

        if(!checkBoard){
            return res.status(httpStatus.NOT_FOUND).json({Message : `Board with code ${code} not exists`});
        }

        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid Board Information"});
        }

        const updateInfo = await board.updateBoardByCondition(info,{board_code : code});

        if(!updateInfo){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to update Board info"});
        }
        
        return res.status(httpStatus.OK).json({Message : "Board info updated successfully"});


    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Board with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getBoardByCode = async(req,res)=>{
    try {

        const code = req.params.board_code;

        const checkBoard = await board.checkBoardByCondition({board_code : code});

        if(!checkBoard){
            return res.status(httpStatus.NOT_FOUND).json({Message : `Board with code ${code} not exists`});
        }
        
        return res.status(httpStatus.OK).json(checkBoard);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Board with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getAllBoards = async(req,res)=>{
    try {

        const checkBoard = await board.getBoards();

        return res.status(httpStatus.OK).json(checkBoard);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Board with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}


const deleteBoardByCode = async(req,res)=>{
    try {

        const code = req.params.board_code;

        const checkBoard = await board.checkBoardByCondition({board_code : code});

        if(!checkBoard){
            return res.status(httpStatus.NOT_FOUND).json({Message : `Board with code ${code} not exists`});
        }

        const deleted = await board.deleteBoardByCondition({board_code : code});

        if(!deleted){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Unable to delete Board"});
        }
        
        return res.status(httpStatus.OK).json({Message :"Board Delete Successfully"});

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "Board with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

module.exports = {
    addNewBoard,
    updateBoard,
    getBoardByCode,
    getAllBoards,
    deleteBoardByCode
}
