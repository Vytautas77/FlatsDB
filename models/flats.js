const mongoose = require("mongoose");

const flatSchema = mongoose.Schema({
  miestas: { type: String, required: true },
  kaina: { type: Number, required: true },
  plotas: { type: Number },
  plotoVienetas: { type: String, required: true },
  kambariuSkaicius: { type: Number, required: true },
  id: { type: String },
});

module.exports = mongoose.model("flats", flatSchema);
