// routes/previousMedications.js

const express = require('express');
const router = express.Router();
const PreviousMedication = require('../models/PreviousMedication');

// POST /api/previous-medications/add
router.post('/add', async (req, res) => {
  const { patientId, medications } = req.body;
  try {
    let doc = await PreviousMedication.findOne({ patientId });
    if (!doc) {
      doc = new PreviousMedication({ patientId, medications });
    } else {
      doc.medications.push(...medications);
    }
    await doc.save();
    res.status(200).json({ message: 'Previous medications added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/previous-medications/:patientId
router.get('/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const doc = await PreviousMedication.findOne({ patientId });
    if (!doc) {
      return res.status(404).json({ message: 'No previous medications found.' });
    }
    res.status(200).json({ medications: doc.medications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
