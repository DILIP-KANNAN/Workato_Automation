const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// POST /api/notifications/add
router.post('/add', async (req, res) => {
  try {
    const { patientId, notifications } = req.body;

    if (!patientId || !Array.isArray(notifications)) {
      return res.status(400).json({ message: 'Patient ID and notifications array are required.' });
    }

    const updatedDoc = await Notification.findOneAndUpdate(
      { patientId },
      { $push: { notifications: { $each: notifications } } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: 'Notifications added successfully.',
      data: updatedDoc
    });
  } catch (error) {
    console.error('Error adding notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/notifications/:patientId
router.get('/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const doc = await Notification.findOne({ patientId });
    if (!doc) {
      return res.status(404).json({ message: 'No notifications found for this patient.' });
    }

    res.status(200).json({
      message: 'Notifications fetched successfully.',
      notifications: doc.notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// PATCH /api/notifications/mark-read
// PATCH /api/notifications/mark-as-read
router.patch('/mark-as-read', async (req, res) => {
  const { patientId, notificationId } = req.body;
  try {
    const doc = await Notification.findOne({ patientId });
    if (!doc) return res.status(404).json({ message: 'Notifications not found.' });

    const notif = doc.notifications.find(n => n._id.toString() === notificationId);
    if (!notif) return res.status(404).json({ message: 'Notification not found.' });

    notif.read = true;
    await doc.save();

    res.status(200).json({ message: 'Notification marked as read.', notification: notif });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PATCH /api/notifications/mark-all-as-read
router.patch('/mark-all-as-read', async (req, res) => {
  const { patientId } = req.body;
  try {
    const doc = await Notification.findOne({ patientId });
    if (!doc) return res.status(404).json({ message: 'Notifications not found.' });

    doc.notifications.forEach(notif => notif.read = true);
    await doc.save();

    res.status(200).json({ message: 'All notifications marked as read.', notifications: doc.notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/notifications/delete
router.delete('/delete', async (req, res) => {  
  const { patientId, notificationId } = req.body;
  try {
    const doc = await Notification.findOne({ patientId });
    if (!doc) return res.status(404).json({ message: 'Notifications not found.' });

    doc.notifications = doc.notifications.filter(n => n._id.toString() !== notificationId);
    await doc.save();

    res.status(200).json({ message: 'Notification deleted successfully.', notifications: doc.notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});


module.exports = router;