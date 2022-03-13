const express = require("express");
const Student = require("../models/student.models");

const student = require("../models/student.models");

const app = express();

app.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).send(student);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = app;
