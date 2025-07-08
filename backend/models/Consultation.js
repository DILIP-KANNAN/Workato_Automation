const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    services: { type: Array, default: [] }
});

module.exports = mongoose.model('Consultation', consultationSchema);
