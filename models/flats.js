const mongoose = require("mongoose");

const flatSchema = mongoose.Schema({
  miestas: { type: String, required: true },
  kaina: { type: Number, required: true },
  plotas: { type: Number, required: true },
  plotoVienetas: { type: String, required: true },
  kambariuSkaicius: { type: Number, required: true },
});

module.exports = mongoose.model("flats", flatSchema);
