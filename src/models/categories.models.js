const {category} = require("../schemas");


const insertCategory = async (data) => {
    try {
      const added = new category(data);
      const result = await added.save();
      return result;
    } catch (error) {
      console.log("Error inserting user:", error);
      if (error.code === 11000) {
        throw new Error("Conflict: Duplicate key error. Category already exists.");
      } else {
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  const getCategories = async()=>{
    try {
      const result = await category.find({});
      return result;
    } catch (error) {
      console.log("Error inserting Category:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  

  const checkCategoryByCondition = async(condition)=>{
    try {
      const result = await category.findOne(condition);
      return result;
    } catch (error) {
      console.log("Error inserting Category:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  
  const updateCategoryByCondition = async(data,condition)=>{
    try {
      const result = await category.updateOne(condition,{$set : data});
      return result;
    } catch (error) {
      console.log("Error updating Category:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  const deleteCategoryByCondition = async(condition)=>{
    try {
      const result = await category.deleteOne(condition);
      return result;
    } catch (error) {
      console.log("Error updating Category:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  module.exports={
    insertCategory,
    checkCategoryByCondition,
    updateCategoryByCondition,
    getCategories,
    deleteCategoryByCondition
  }