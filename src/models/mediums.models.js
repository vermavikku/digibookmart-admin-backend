const {medium} = require("../schemas");


const insertMedium = async (data) => {
    try {
      const added = new medium(data);
      const result = await added.save();
      return result;
    } catch (error) {
      console.log("Error inserting user:", error);
      if (error.code === 11000) {
        throw new Error("Conflict: Duplicate key error. medium already exists.");
      } else {
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  const getMediums = async()=>{
    try {
      const result = await medium.find({});
      return result;
    } catch (error) {
      console.log("Error inserting medium:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  

  const checkMediumByCondition = async(condition)=>{
    try {
      const result = await medium.findOne(condition);
      return result;
    } catch (error) {
      console.log("Error inserting medium:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  
  const updateMediumByCondition = async(data,condition)=>{
    try {
      const result = await medium.updateOne(condition,{$set : data});
      return result;
    } catch (error) {
      console.log("Error updating medium:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  const deleteMediumByCondition = async(condition)=>{
    try {
      const result = await medium.deleteOne(condition);
      return result;
    } catch (error) {
      console.log("Error updating medium:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  module.exports={
    insertMedium,
    checkMediumByCondition,
    updateMediumByCondition,
    getMediums,
    deleteMediumByCondition
  }