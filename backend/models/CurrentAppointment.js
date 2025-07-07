const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: { type: String, required: true },
    service: { type: String, required: true },
    doctor: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }
}, { _id: false }); // prevent automatic _id for subdocs

const currentAppointmentsSchema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    appointments: [appointmentSchema]
}, { timestamps: true });

module.exports = mongoose.model('CurrentAppointments', currentAppointmentsSchema);
