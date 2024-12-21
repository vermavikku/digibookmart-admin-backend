const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
    },
}, {
    timestamps: true, 
    versionKey: false,
});


const Users = mongoose.model("Users", userSchema);

module.exports = Users;
