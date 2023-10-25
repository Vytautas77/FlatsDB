const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userFlatProducts: { type: [], required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
