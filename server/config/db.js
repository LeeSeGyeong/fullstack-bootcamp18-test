const mongoose = require("mongoose");
const URI = process.env.MONGO_DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to Mongodb Atlas");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };
