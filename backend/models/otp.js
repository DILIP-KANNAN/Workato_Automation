const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 } // expires after 5 min
});

module.exports = mongoose.model('Otp', otpSchema);
