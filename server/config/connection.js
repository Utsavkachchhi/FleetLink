const mongoose = require("mongoose");
const config = require("./index");

const connectDB = () => {
  return mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB; 