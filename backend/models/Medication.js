const mongoose = require('mongoose');

const medicationItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    timing: { type: [String], default: [] },
    foodInstruction: { type: String },
    duration: { type: String },
    sideEffects: { type: String },
    prescribedBy: { type: String },
    treatment: { type: String },
    startDate: { type: String }, // or Date if consistent
    endDate: { type: String },   // optional for completed meds
    totalQuantity: { type: Number, required: true },
    Quantity: { type: Number, default: 15 }, // current quantity tracker
    reminderTimes: { type: mongoose.Schema.Types.Mixed } // flexible for { morning: '08:00' }
}, { _id: false });

const medicationSchema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    medications: { type: [medicationItemSchema], default: [] }
});

const Medication = mongoose.model('Medication', medicationSchema);
module.exports = Medication;
