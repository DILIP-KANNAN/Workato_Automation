const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Otp = require('../models/otp');
const jwt = require('jsonwebtoken');

// Utility function to generate unique patient ID
const generatePatientId = () => {
    return 'PAT' + Date.now(); // Example: PAT1720509050102
};

// @route   POST /api/patient/register
// @desc    Register a new patient
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, mobile, email, dateOfBirth, gender, address, extraInfo } = req.body;

        if (!name || !mobile) {
            return res.status(400).json({ message: 'Name and mobile number are required' });
        }

        const existingPatient = await Patient.findOne({ mobile });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient with this mobile number already exists' });
        }

        const patientId = generatePatientId();

        const newPatient = new Patient({
            patientId,
            name,
            mobile,
            email,
            dateOfBirth,
            gender,
            address,
            extraInfo
        });

        await newPatient.save();

        res.status(201).json({
            message: 'Patient registered successfully',
            patientId,
            patient: {
                name,
                mobile,
                email,
                dateOfBirth,
                gender,
                address
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    } 
});

// @route   POST /api/patient/login
// @desc    Patient login - generate OTP
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { patientId, mobile } = req.body;

        if (!patientId || !mobile) {
            return res.status(400).json({ message: 'Patient ID and mobile number are required' });
        }

        const patient = await Patient.findOne({ patientId, mobile });
        if (!patient) {
            return res.status(400).json({ message: 'Patient not found with provided ID and mobile number' });
        }

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({ patientId, otp: generatedOtp });

        // In production: send OTP via SMS
        // For now, return OTP for testing
        res.status(200).json({
            message: 'OTP generated successfully',
            otp: generatedOtp // remove in production
        });
    } catch (error) {
        console.error('OTP generation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/patient/verify-otp
// @desc    Verify OTP and login patient
// @access  Public
router.post('/verify-otp', async (req, res) => {
    try {
        const { patientId, otp } = req.body;

        if (!patientId || !otp) {
            return res.status(400).json({ message: 'Patient ID and OTP are required' });
        }

        const existingOtp = await Otp.findOne({ patientId, otp });
        if (!existingOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(400).json({ message: 'Patient not found' });
        }

        // OTP verified, generate JWT
        const token = jwt.sign(
            { id: patient._id, role: 'patient', patientId: patient.patientId },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Clean up OTP after successful use
        await Otp.deleteMany({ patientId });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: patient._id,
                patientId: patient.patientId,
                name: patient.name,
                email: patient.email,
                mobile: patient.mobile,
                role: 'patient'
            }
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
