const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userFlatProducts: { type: [], required: true },
});

module.exports = mongoose.model("users", userSchema);
