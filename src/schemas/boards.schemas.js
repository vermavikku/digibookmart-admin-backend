const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    board_name: {
        type: String,
        required: true,
    },
    board_code: {
        type: String,
        unique: true,
        required: true,
    }
}, {
    timestamps: true, 
    versionKey: false,
});


const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
