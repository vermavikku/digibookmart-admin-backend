const mongoose = require('mongoose');
const dotenv = require("dotenv");

// Connection URI
const uri = process.env.DB_URI; // Adjust the URI and database name based on your MongoDB setup

// Connect to MongoDB
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection events
db.on('connected', () => {
  console.log(`Connected to MongoDB at ${uri}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the connection
module.exports = db;
