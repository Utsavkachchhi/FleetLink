const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  capacityKg: { type: Number, required: true, min: 0 },
  tyres: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
