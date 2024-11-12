const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  link: String,
  radio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Radio",
  },
});

module.exports = mongoose.model("Record", recordSchema);
