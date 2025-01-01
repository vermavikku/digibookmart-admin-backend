const express = require("express");
const router = express.Router();
const {product} = require("../controllers");

const {fileMiddleware} = require("../middlewares");

router.post("/add",fileMiddleware([{
    fieldName: "product_thumbnail",
    folderName: "thumbnails",
    minFiles: 1,
    required: true,
  }]),product.addNewProduct);

  router.put("/update/:product_id",fileMiddleware([{
    fieldName: "product_thumbnail",
    folderName: "thumbnails",
    minFiles: 1,
    required: false,
  }]),product.updateProduct);

  router.get("/:product_id",product.getProductById);

  router.get("/",product.getAllProducts);

  router.delete("/delete/:product_id",product.deleteProductById);


module.exports = router;