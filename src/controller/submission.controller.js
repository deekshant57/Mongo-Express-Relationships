const express = require("express");

const submission = require("../models/submission.models");
const app = express();

// get users through submission

app.get("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).lean().exec();
    return res.status(200).send(submission);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});
module.exports = app;
