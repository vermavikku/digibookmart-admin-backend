const {product} = require("../schemas");


const insertProduct = async (data) => {
    try {
      const added = new product(data);
      const result = await added.save();
      return result;
    } catch (error) {
      console.log("Error inserting user:", error);
      if (error.code === 11000) {
        throw new Error("Conflict: Duplicate key error. product already exists.");
      } else {
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  const getProducts = async()=>{
    try {
      const result = await product.find({});
      return result;
    } catch (error) {
      console.log("Error inserting product:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  

  const checkProductByCondition = async(condition)=>{
    try {
      const result = await product.findOne(condition);
      return result;
    } catch (error) {
      console.log("Error inserting product:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
  
  const updateProductByCondition = async(data,condition)=>{
    try {
      const result = await product.updateOne(condition,{$set : data});
      return result;
    } catch (error) {
      console.log("Error updating product:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  const deleteProductByCondition = async(condition)=>{
    try {
      const result = await product.deleteOne(condition);
      return result;
    } catch (error) {
      console.log("Error updating product:", error);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }

  module.exports={
    insertProduct,
    checkProductByCondition,
    updateProductByCondition,
    getProducts,
    deleteProductByCondition
  }