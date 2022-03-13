const express = require("express");
const Batch = require("../models/batch.models");

const batch = require("../models/batch.models");

const app = express();

app.post("", async (req, res) => {
  const batch = await Batch.create(req.body);
  return res.status(201).send(batch);
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
