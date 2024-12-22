const httpStatus = require("http-status");
const {category} = require("../models");
const trim_values = require("../utils/trim_values");

const addNewCategory = async(req,res)=>{
    try {

        const file = req.filePaths;
        const info = trim_values(req.body);
        
        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid Category Information"});
        }

        const added = await category.insertCategory({...info,category_thumbnail:file.category_thumbnail[0]});

        if(!added){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to add category info"});
        }

        return res.status(httpStatus.CREATED).json({Message : "category info added successfully"});


    }  catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "category with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
      }
}

const updateCategory = async(req,res)=>{
    try {

        const code = req.params.category_code;
        const info = req.body;
        const file = req.filePaths;

        const checkCategory = await category.checkCategoryByCondition({category_code : code});

        if(!checkCategory){
            return res.status(httpStatus.NOT_FOUND).json({Message : `category with code ${code} not exists`});
        }

        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid Category Information"});
        }

        let finalData = {...info};

        if(file && file.hasOwnProperty("category_thumbnail") && file.category_thumbnail[0] != ""){
            finalData = { ...finalData,category_thumbnail : file.category_thumbnail[0]};
        }

        const updateInfo = await category.updateCategoryByCondition(finalData,{category_code : code});

        if(!updateInfo){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to update category info"});
        }
        
        return res.status(httpStatus.OK).json({Message : "category info updated successfully"});


    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "category with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getCategoryByCode = async(req,res)=>{
    try {

        const code = req.params.category_code;

        const checkCategory = await category.checkCategoryByCondition({category_code : code});

        if(!checkCategory){
            return res.status(httpStatus.NOT_FOUND).json({Message : `category with code ${code} not exists`});
        }
        
        return res.status(httpStatus.OK).json(checkCategory);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "category with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getAllCategories = async(req,res)=>{
    try {

        const checkCategory = await category.getCategories();

        return res.status(httpStatus.OK).json(checkCategory);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "category with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}


const deleteCategoryByCode = async(req,res)=>{
    try {

        const code = req.params.category_code;

        const checkCategory = await category.checkCategoryByCondition({category_code : code});

        if(!checkCategory){
            return res.status(httpStatus.NOT_FOUND).json({Message : `category with code ${code} not exists`});
        }

        const deleted = await category.deleteCategoryByCondition({category_code : code});

        if(!deleted){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Unable to delete category"});
        }
        
        return res.status(httpStatus.OK).json({Message :"Category Delete Successfully"});

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "category with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

module.exports = {
    addNewCategory,
    updateCategory,
    getCategoryByCode,
    getAllCategories,
    deleteCategoryByCode
}
