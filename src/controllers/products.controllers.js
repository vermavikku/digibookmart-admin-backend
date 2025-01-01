const httpStatus = require("http-status");
const {product} = require("../models");
const trim_values = require("../utils/trim_values");

const addNewProduct= async(req,res)=>{
    try {
        const file = req.filePaths;
        const info = trim_values(req.body);
        
        
        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid product Information"});
        }

        const added = await product.insertProduct({...info,product_thumbnail:file.product_thumbnail[0]});

        if(!added){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to add product info"});
        }

        return res.status(httpStatus.CREATED).json({Message : "product info added successfully"});


    }  catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "product with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
      }
}

const updateProduct = async(req,res)=>{
    try {

        const id = req.params.product_id;
        const info = trim_values(req.body);
        const file = req.filePaths;

        const checkProduct = await product.checkProductByCondition({_id : id});

        if(!checkProduct){
            return res.status(httpStatus.NOT_FOUND).json({Message : `product with id ${id} not exists`});
        }

        if(Object.keys(info).length == 0){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Please Provide Valid product Information"});
        }

        let finalData = {...info};

        if(file && file.hasOwnProperty("product_thumbnail") && file.product_thumbnail[0] != ""){
            finalData = { ...finalData,product_thumbnail : file.product_thumbnail[0]};
        }

        const updateInfo = await product.updateProductByCondition(finalData,{_id : id});

        if(!updateInfo){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "unable to update product info"});
        }
        
        return res.status(httpStatus.OK).json({Message : "product info updated successfully"});


    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "product with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getProductById = async(req,res)=>{
    try {

        const id = req.params.product_id;

        const checkProduct = await product.checkProductByCondition({_id : id});

        if(!checkProduct){
            return res.status(httpStatus.NOT_FOUND).json({Message : `product with id ${id} not exists`});
        }
        
        return res.status(httpStatus.OK).json(checkProduct);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "product with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

const getAllProducts = async(req,res)=>{
    try {

        const checkProduct = await product.getProducts();

        return res.status(httpStatus.OK).json(checkProduct);

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "product with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}


const deleteProductById = async(req,res)=>{
    try {

        const id = req.params.product_id;

        const checkProduct = await product.checkProductByCondition({_id : id});

        if(!checkProduct){
            return res.status(httpStatus.NOT_FOUND).json({Message : `product with id ${id} not exists`});
        }

        const deleted = await product.deleteProductByCondition({_id : id});

        if(!deleted){
            return res.status(httpStatus.BAD_REQUEST).json({Message : "Unable to delete product"});
        }
        
        return res.status(httpStatus.OK).json({Message :"product Delete Successfully"});

    } catch (error) {
        console.log(error);
        if(error.message.includes("Conflict")){
          return res.status(httpStatus.CONFLICT).json({Message : "product with this code already exists"});
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Message : "Internal Server Error"});
    }
}

module.exports = {
    addNewProduct,
    updateProduct,
    getProductById,
    getAllProducts,
    deleteProductById
}
