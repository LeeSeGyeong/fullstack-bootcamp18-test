const mongoose = require("mongoose");
const { Schema } = mongoose;

const documentSchema = new Schema({
   title: { type: String, required: true },
   author: { type: Schema.Types.ObjectId, ref: "User" },
   tempContent: { type: String },
   collaborator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Document", documentSchema);
