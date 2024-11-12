const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  date : Date,
  radio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Radio",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image : String
});

module.exports = mongoose.model("Stream", streamSchema);
