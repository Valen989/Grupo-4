const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  validated: Boolean,
  token: String,
  radio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Radio",
  },
});

module.exports = mongoose.model("User", userSchema);
