const {users} = require("../schemas");

const insertUser = async (data) => {
  try {
    const added = new users(data);
    const result = await added.save();
    return result;
  } catch (error) {
    console.log("Error inserting user:", error);
    if (error.code === 11000) {
      throw new Error("Conflict: Duplicate key error. User already exists.");
    } else {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
};



module.exports = {
  insertUser,
};
