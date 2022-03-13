const mongoose = require("mongoose");

//Student Schema
const studentSchema = new mongoose.Schema(
  {
    rollId: { type: String, required: true },
    currentBatch: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// Student Model
const Student = mongoose.model("student", studentSchema);

module.exports = Student;
