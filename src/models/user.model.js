const mongoose = require("mongoose");

// User Schema;
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// User Model
const User = mongoose.model("user", userSchema);

module.exports = User;
