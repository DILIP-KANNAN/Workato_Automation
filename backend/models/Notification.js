const mongoose = require('mongoose');

const singleNotificationSchema = new mongoose.Schema({
  id: Number,
  type: String,
  title: String,
  message: String,
  time: Date,
  read: { type: Boolean, default: false },
  priority: String,
  icon: String,
  color: String,
  bgColor: String
});

const notificationSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  notifications: { type: [singleNotificationSchema], default: [] }
});

// TTL Index for auto-delete notifications older than 7 days
notificationSchema.index(
  { "notifications.time": 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60, partialFilterExpression: { "notifications.read": true } }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
