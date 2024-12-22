const mongoose = require("mongoose");

const mediumSchema = new mongoose.Schema({
    medium_name: {
        type: String,
        required: true,
    },
    medium_code: {
        type: String,
        unique: true,
        required: true,
    }
}, {
    timestamps: true, 
    versionKey: false,
});


const Medium = mongoose.model("Medium", mediumSchema);

module.exports = Medium;
