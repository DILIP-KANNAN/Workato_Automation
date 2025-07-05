const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, unique: true }, // unique patient ID (PAT123)
    firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },  // Date type is better for DOB
  gender: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  emergencyContact: { type: String },
  emergencyRelation: { type: String },
  bloodGroup: { type: String },
  allergies: { type: String },
  chronicConditions: { type: String },
  currentMedications: { type: String }
}, { timestamps: true 
});

module.exports = mongoose.model('Patient', patientSchema);
 