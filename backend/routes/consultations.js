const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');

// POST /api/consultations/add
router.post('/add', async (req, res) => {
    const { patientId, services } = req.body;
    try {
        const doc = await Consultation.findOneAndUpdate(
            { patientId },
            { patientId, services },
            { upsert: true, new: true }
        );
        res.status(200).json({ message: "Consultations data added/updated.", data: doc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

// GET /api/consultations/:patientId
router.get('/:patientId', async (req, res) => {
    try {
        const doc = await Consultation.findOne({ patientId: req.params.patientId });
        if (!doc) return res.status(404).json({ message: "Consultations not found." });
        res.status(200).json({ data: doc.services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
