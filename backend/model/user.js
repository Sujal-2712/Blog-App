const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  blogs: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User ;
