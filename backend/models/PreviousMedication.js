// models/PreviousMedication.js

const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  id: String,
  name: String,
  dosage: String,
  frequency: String,
  timing: [String],
  foodInstruction: String,
  duration: String,
  prescribedBy: String,
  treatment: String,
  startDate: String,
  endDate: String,
  status: String
});

const previousMedicationSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  medications: [medicationSchema]
});

module.exports = mongoose.model('PreviousMedication', previousMedicationSchema);
