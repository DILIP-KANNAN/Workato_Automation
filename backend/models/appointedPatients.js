const mongoose = require('mongoose');

const appointedPatientsSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointments: [
        {
            patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
            patientName: { type: String, required: true },
            appointmentDate: { type: Date, required: true },
            time: { type: String },
            status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
            service: { type: String }, // eg: Cardiology, Radiology, etc.
            room: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('AppointedPatients', appointedPatientsSchema);
