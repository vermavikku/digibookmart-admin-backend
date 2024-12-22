const express = require("express");
const router = express.Router();
const {board} = require("../controllers");

 router.post("/add",board.addNewBoard);

  router.put("/update/:board_code",board.updateBoard);

  router.get("/:board_code",board.getBoardByCode);

  router.get("/",board.getAllBoards);

  router.delete("/delete/:board_code",board.deleteBoardByCode);


module.exports = router;