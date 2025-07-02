const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Staff = require('../models/Staff');

const protect = async (req, res, next) => {
    let token;

    // Expecting token in Authorization header as "Bearer <token>"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request based on role
            if (decoded.role === 'patient') {
                req.user = await Patient.findById(decoded.id).select('-password');
            } else if (decoded.role === 'doctor' || decoded.role === 'nurse' || decoded.role === 'admin') {
                req.user = await Staff.findById(decoded.id).select('-password');
            } else {
                return res.status(401).json({ message: 'Invalid user role' });
            }

            next(); // continue to controller
        } catch (error) {
            console.error('JWT auth error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided, authorization denied' });
    }
};

module.exports = protect;
