const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// Add or overwrite medications for a patient
router.post('/add', async (req, res) => {
    try {
        const { patientId, medications } = req.body;

        if (!patientId || !Array.isArray(medications)) {
            return res.status(400).json({ message: 'Patient ID and medications array are required' });
        }

        const medicationsWithDefaultQuantity = medications.map(med => ({
            ...med,
            Quantity: med.Quantity || 15 // default to 15 if not present
        }));
        
        const result = await Medication.findOneAndUpdate(
            { patientId },
            { patientId, medications: medicationsWithDefaultQuantity },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: 'Medications added/updated successfully',
            data: result
        });

    } catch (error) {
        console.error('Error adding medications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve medications for a patient
router.get('/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const result = await Medication.findOne({ patientId });

        if (!result) {
            return res.status(404).json({ message: 'No medications found for this patient' });
        }

        res.status(200).json({
            message: 'Medications fetched successfully',
            medications: result.medications
        });

    } catch (error) {
        console.error('Error fetching medications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PATCH /api/medications/update-quantity
router.patch('/update-quantity', async (req, res) => {
  const { patientId, medicationId, Quantity } = req.body;
  try {
    const doc = await Medication.findOne({ patientId });
    if (!doc) return res.status(404).json({ message: 'Medications not found.' });

    const med = doc.medications.find(m => m.id === medicationId);
    if (!med) return res.status(404).json({ message: 'Medication not found.' });
    med.Quantity = Quantity;
    doc.markModified('medications');
    await doc.save();


    res.status(200).json({ message: 'Quantity updated successfully.', medication: med });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PATCH /api/medications/update-reminder
router.patch('/update-reminder', async (req, res) => {
  const { patientId, medicationId, timing, time } = req.body;
  try {
    const doc = await Medication.findOne({ patientId });
    if (!doc) return res.status(404).json({ message: 'Medications not found.' });

    const med = doc.medications.find(m => m.id === medicationId);
    if (!med) return res.status(404).json({ message: 'Medication not found.' });

    if (!med.reminderTimes) med.reminderTimes = {};
    med.reminderTimes[timing] = time;

    doc.markModified('medications');
    await doc.save();


    res.status(200).json({ message: 'Reminder time updated successfully.', medication: med });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;

