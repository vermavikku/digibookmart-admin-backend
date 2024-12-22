const express = require("express");
const router = express.Router();
const {medium} = require("../controllers");

 router.post("/add",medium.addNewMedium);

  router.put("/update/:medium_code",medium.updateMedium);

  router.get("/:medium_code",medium.getMediumByCode);

  router.get("/",medium.getAllMediums);

  router.delete("/delete/:medium_code",medium.deleteMediumByCode);


module.exports = router;