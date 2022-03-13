const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://deekshant57:deekshant_123@practice.9w926.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};

module.exports = connect;
