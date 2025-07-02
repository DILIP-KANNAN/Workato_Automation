const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Patient = require('../models/Patient');

// @route GET /api/patient/profile
// @desc  Get logged-in patient profile
// @access Private
router.get('/profile', protect, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
