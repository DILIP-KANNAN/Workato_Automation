const express = require('express');
const router = express.Router();
const CurrentAppointments = require('../models/CurrentAppointment');
const { v4: uuidv4 } = require('uuid'); // for generating unique appointmentId

// Add demo appointments
router.post('/add-demo', async (req, res) => {
    try {
        const { patientId } = req.body;
        if (!patientId) return res.status(400).json({ message: "Patient ID is required" });

        const demoAppointments = [
            {
                appointmentId: uuidv4(),
                service: 'Cardiology',
                doctor: 'Dr. Sarah Johnson',
                date: '2025-01-15',
                time: '10:00 AM',
                status: 'confirmed',
                location: 'Cardiology Wing, 3rd Floor',
                type: 'Follow-up Consultation'
            },
            {
                appointmentId: uuidv4(),
                service: 'General Medicine',
                doctor: 'Dr. Michael Chen',
                date: '2025-01-18',
                time: '2:30 PM',
                status: 'confirmed',
                location: 'General Medicine, 2nd Floor',
                type: 'Routine Checkup'
            },
            {
                appointmentId: uuidv4(),
                service: 'Radiology',
                doctor: 'Dr. Lisa Park',
                date: '2025-01-20',
                time: '9:15 AM',
                status: 'pending',
                location: 'Radiology Department, Ground Floor',
                type: 'CT Scan'
            }
        ];

        // Upsert logic: create if not exists
        let record = await CurrentAppointments.findOne({ patientId });
        if (!record) {
            record = new CurrentAppointments({ patientId, appointments: demoAppointments });
        } else {
            record.appointments.push(...demoAppointments);
        }

        await record.save();

        res.status(201).json({ message: "Demo appointments added successfully" });
    } catch (error) {
        console.error('Error adding demo appointments:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// Retrieve appointments for a patient
router.get('/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const record = await CurrentAppointments.findOne({ patientId });
        if (!record) {
            return res.status(404).json({ message: "No appointments found for this patient" });
        }
        res.status(200).json({ appointments: record.appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a specific appointment by appointmentId
router.delete('/:patientId/:appointmentId', async (req, res) => {
    try {
        const { patientId, appointmentId } = req.params;

        const result = await CurrentAppointments.updateOne(
            { patientId },
            { $pull: { appointments: { appointmentId } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Appointment not found or already deleted" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/appointments/next/:patientId

router.get('/next/:patientId', async (req, res) => {
    console.log("reached")
    try {
        const { patientId } = req.params;

        const now = new Date();

        const appointments = await Appointment.find({
            patientId,
            status: { $ne: 'cancelled' }
        });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }

        const upcomingAppointments = appointments
            .map(appt => ({
                ...appt._doc,
                datetime: new Date(`${appt.date} ${appt.time}`)
            }))
            .filter(appt => appt.datetime > now)
            .sort((a, b) => a.datetime - b.datetime);

        if (!upcomingAppointments.length) {
            return res.status(404).json({ message: "No upcoming appointments found" });
        }

        res.json({ appointment: upcomingAppointments[0] });
    } catch (error) {
        console.error("Error fetching next appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
