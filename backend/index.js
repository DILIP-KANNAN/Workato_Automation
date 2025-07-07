const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Import and use patient routes
const patientRoutes = require('./routes/patientAuth');
app.use('/api/patient', patientRoutes);
const staffRoutes = require('./routes/staffAuth');
app.use('/api/staff', staffRoutes);
const appointmentsRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentsRoutes);
const medicationRoutes = require('./routes/medications');
app.use('/api/medications', medicationRoutes);
const previousMedicationsRoutes = require('./routes/previousMedications');
app.use('/api/previous-medications', previousMedicationsRoutes);
const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
