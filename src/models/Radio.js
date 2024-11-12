const mongoose = require("mongoose");

const radioSchema = new mongoose.Schema({
  name: String,
  province: String,
  city: String,
  frequency: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Radio", radioSchema);
