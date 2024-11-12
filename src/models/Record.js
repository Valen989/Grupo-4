const mongoose = require("mongoose");

const radioSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  link: String,
  radio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Radio",
  },
});

module.exports = mongoose.model("Radio", radioSchema);
