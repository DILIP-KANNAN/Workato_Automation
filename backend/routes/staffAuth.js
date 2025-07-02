const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const jwt = require('jsonwebtoken');

// @route   POST /api/staff/login
// @desc    Staff login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { staffId, password } = req.body;

        if (!staffId || !password) {
            return res.status(400).json({ message: 'Staff ID and password are required' });
        }

        const staff = await Staff.findOne({ staffId });
        if (!staff) {
            return res.status(400).json({ message: 'Staff not found' });
        }

        const isMatch = await staff.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: staff._id, role: staff.role, staffId: staff.staffId },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: staff._id,
                staffId: staff.staffId,
                name: staff.name,
                role: staff.role
            }
        });
    } catch (error) {
        console.error('Staff login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
