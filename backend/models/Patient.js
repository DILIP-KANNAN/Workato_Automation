const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number }, // new field to store computed age
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    emergencyContact: { type: String },
    emergencyRelation: { type: String },
    bloodGroup: { type: String },
    allergies: { type: String },
    chronicConditions: { type: String },
    currentMedications: { type: String },
    vitals: {
        bp: { type: String, default: null },
        hr: { type: String, default: null },
        temp: { type: String, default: null },
        weight: { type: String, default: null },
        height: { type: String, default: null },
    },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
