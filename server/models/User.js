const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  email: String,
  nick: String,
  provider: { type: String, default: "google" }
});

module.exports = mongoose.model("User", userSchema);
