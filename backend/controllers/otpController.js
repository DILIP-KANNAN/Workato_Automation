const Otp = require('../models/otp');

const generateOtp = async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ message: 'Mobile number is required' });
        }

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.create({ mobile, otp: generatedOtp });

        res.status(200).json({
            message: 'OTP generated successfully',
            otp: generatedOtp // remove in production
        });
    } catch (error) {
        console.error('OTP generation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { generateOtp };
