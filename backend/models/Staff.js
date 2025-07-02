const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    staffId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['doctor', 'nurse', 'admin'], required: true },
    password: { type: String, required: true }
});

// Pre-save hook to hash password before saving
staffSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords during login
staffSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Staff', staffSchema);
