const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    product_title :{
        type : String,
        required : true,
    },
    product_description :{
        type : String,
        required : true,
    },
    product_category: {
        type: String,
        required: true,
    },
    product_medium :{
        type: String,
        required : true,
    },
    product_board :{
        type: String,
        required : true,
    },
    product_thumbnail :{
        type : String,
        required : true,
    },
    product_quantity :{
        type : Number,
        required : true,
        default : 0,
    }
}, {
    timestamps: true, 
    versionKey: false,
})

const Product = mongoose.model("Product" , productSchema);

module.exports = Product;