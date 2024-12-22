const {board} = require("../schemas");


const insertBoard = async (data) => {
    try {
      const added = new board(data);
      const result = await added.save();
      return result;
    } catch (error) {
      console.log("Error inserting user:", error);
      if (error.code === 11000) {
        throw new Error("Conflict: Duplicate key error. board already exists.");
      } else {
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  const getBoards = async()=>{
    try {
      const result = await board.find({});
      return result;
    } catch (error) {
      console.log("Error inserting board:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  

  const checkBoardByCondition = async(condition)=>{
    try {
      const result = await board.findOne(condition);
      return result;
    } catch (error) {
      console.log("Error inserting board:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  
  const updateBoardByCondition = async(data,condition)=>{
    try {
      const result = await board.updateOne(condition,{$set : data});
      return result;
    } catch (error) {
      console.log("Error updating board:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  const deleteBoardByCondition = async(condition)=>{
    try {
      const result = await board.deleteOne(condition);
      return result;
    } catch (error) {
      console.log("Error updating board:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  module.exports={
    insertBoard,
    checkBoardByCondition,
    updateBoardByCondition,
    getBoards,
    deleteBoardByCondition
  }