const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
    category_code: {
        type: String,
        unique: true,
        required: true,
    },
    category_thumbnail: {
        type: String,
    },
}, {
    timestamps: true, 
    versionKey: false,
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
