const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, unique: true }, // unique patient ID (PAT123)
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    extraInfo: {} // flexible field for medical history, allergies, etc.
});

module.exports = mongoose.model('Patient', patientSchema);
 