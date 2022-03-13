const mongoose = require("mongoose");

//Batch Schema
const batchSchema = new mongoose.Schema(
  {
    batchName: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// Batch Model
const Batch = mongoose.model("batch", batchSchema);

module.exports = Batch;
