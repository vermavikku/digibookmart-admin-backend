const express = require("express");
const router = express.Router();
const {category} = require("../controllers");
const {fileMiddleware} = require("../middlewares");

router.post("/add",fileMiddleware([{
    fieldName: "category_thumbnail",
    folderName: "thumbnails",
    minFiles: 1,
    required: true,
  }]),category.addNewCategory);

  router.put("/update/:category_code",fileMiddleware([{
    fieldName: "category_thumbnail",
    folderName: "thumbnails",
    minFiles: 1,
    required: false,
  }]),category.updateCategory);

  router.get("/:category_code",category.getCategoryByCode);

  router.get("/",category.getAllCategories);

  router.delete("/delete/:category_code",category.deleteCategoryByCode);


module.exports = router;