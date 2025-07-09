const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Otp = require('../models/otp');
const jwt = require('jsonwebtoken');
const { generateOtp } = require('../controllers/otpController');

// Utility function to generate unique patient ID
const generatePatientId = () => {
    return 'PAT' + Date.now();
};

// @route POST /api/patient/generate-otp
// @desc Generate OTP for login/signup
router.post('/generate-otp', generateOtp);

// @route POST /api/patient/register
// @desc Register a new patient after OTP verification
function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

router.post('/register', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            mobile,
            email,
            address,
            emergencyContact,
            emergencyRelation,
            bloodGroup,
            allergies,
            chronicConditions,
            currentMedications,
        } = req.body;

        if (!firstName || !lastName || !dateOfBirth || !gender || !mobile || !email) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const existingPatient = await Patient.findOne({ mobile });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient with this mobile number already exists" });
        }

        const age = calculateAge(dateOfBirth);

        const newPatient = new Patient({
            patientId: generatePatientId(),
            firstName,
            lastName,
            dateOfBirth,
            age,
            gender,
            mobile,
            email,
            address,
            emergencyContact,
            emergencyRelation,
            bloodGroup,
            allergies,
            chronicConditions,
            currentMedications,
            vitals: { bp: null, hr: null, temp: null, weight: null, height: null }
        });

        await newPatient.save();
        await Otp.deleteMany({ mobile });

        const token = jwt.sign(
            { id: newPatient._id, role: 'patient', patientId: newPatient.patientId },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: "Patient registered successfully",
            token,
            user: {
                id: newPatient._id,
                patientId: newPatient.patientId,
                name: `${newPatient.firstName} ${newPatient.lastName}`,
                email: newPatient.email,
                mobile: newPatient.mobile,
                role: 'patient'
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Server error" });
    }
})

// @route POST /api/patient/login
// @desc Login patient after OTP verification
router.post('/login', async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ message: 'Mobile number and OTP are required' });
        }

        const otpRecord = await Otp.findOne({ mobile, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const patient = await Patient.findOne({ mobile });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const token = jwt.sign(
            { id: patient._id, role: 'patient', patientId: patient.patientId },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        await Otp.deleteMany({ mobile });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: patient._id,
                patientId: patient.patientId,
                name: `${patient.firstName} ${patient.lastName}`,
                email: patient.email,
                mobile: patient.mobile,
                role: 'patient'
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/patient/verify-otp
// @desc    Verify OTP (for signup)
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ message: 'Mobile number and OTP are required' });
    }

    const existingOtp = await Otp.findOne({ mobile, otp });
    if (!existingOtp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP verified successfully, clean up
    await Otp.deleteMany({ mobile });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
});


module.exports = router;
