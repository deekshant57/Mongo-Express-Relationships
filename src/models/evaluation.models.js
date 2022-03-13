const mongoose = require("mongoose");

//Evaluation Collection
const evaluationSchema = new mongoose.Schema({
  dateOfEvaluation: { type: String, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
    required: true,
  },
});

// evaluation model
const Evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = Evaluation;
