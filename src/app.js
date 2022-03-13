const express = require("express");

const connect = require("./configs/db");

const submissionController = require("./controller/submission.controller");

const batchController = require("./controller/batch.controller");

const studentController = require("./controller/student.controller");

const app = express();

app.use(express.json());

// Route Handlers

app.use("/submission", submissionController);

app.use("/batch", batchController);

app.use("/student", studentController);

app.listen(4001, async () => {
  try {
    await connect();
    console.log("Listening on port 4001");
  } catch (error) {
    console.log(error);
  }
});
