const express = require('express');
const router = express.Router();
const AppointedPatients = require('../models/appointedPatients');
const Patient = require('../models/Patient');

// Add or update appointments for a doctor
router.post('/add', async (req, res) => {
    try {
        const { doctorId, appointments } = req.body;
        if (!doctorId || !appointments || !Array.isArray(appointments)) {
            return res.status(400).json({ message: "Doctor ID and appointments array are required" });
        }

        // Validate and build appointments array
        const processedAppointments = [];
        for (const appt of appointments) {
            const patient = await Patient.findOne({ patientId: appt.patientId });
            if (!patient) {
                return res.status(404).json({ message: `Patient with ID ${appt.patientId} not found` });
            }
            processedAppointments.push({
                patientId: patient._id,
                patientName: `${patient.firstName} ${patient.lastName}`,
                appointmentDate: appt.appointmentDate,
                time: appt.time,
                status: appt.status || 'scheduled',
                service: appt.service,
                room: appt.room
            });
        }

        // Upsert doctor appointments
        const updatedDoc = await AppointedPatients.findOneAndUpdate(
            { doctorId },
            { $set: { appointments: processedAppointments } },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: "Appointments updated successfully",
            data: updatedDoc
        });
    } catch (error) {
        console.error('Appointment save error:', error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;

        const appointmentsDoc = await AppointedPatients.findOne({ doctorId }).populate('appointments.patientId');
        if (!appointmentsDoc) {
            return res.status(404).json({ message: "No appointments found for this doctor" });
        }

        // Format data to send full patient data + appointment details
        const formattedAppointments = appointmentsDoc.appointments.map(appt => {
            const patient = appt.patientId;
            return {
                patientId: patient.patientId,
                name: `${patient.firstName} ${patient.lastName}`,
                age: patient.age,
                gender: patient.gender,
                mobile: patient.mobile,
                email: patient.email,
                bloodGroup: patient.bloodGroup,
                allergies: patient.allergies,
                chronicConditions: patient.chronicConditions,
                currentMedications: patient.currentMedications,
                vitals: patient.vitals,
                appointmentDate: appt.appointmentDate,
                time: appt.time,
                status: appt.status,
                service: appt.service,
                room: appt.room
            };
        });

        res.status(200).json({
            message: "Appointments fetched successfully",
            data: formattedAppointments
        });
    } catch (error) {
        console.error('Fetch appointments error:', error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
