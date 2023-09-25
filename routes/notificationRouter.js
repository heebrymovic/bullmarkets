const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

// Create a new notification
router.post('/notifications', NotificationController.createNotification);

// Get all notifications
router.get('/notifications', NotificationController.getAllNotifications);

// Get notification by ID
router.get('/notifications/:id', NotificationController.getNotificationById);

// Update notification by ID
router.put('/notifications/:id', NotificationController.updateNotificationById);

// Delete notification by ID
router.delete('/notifications/:id', NotificationController.deleteNotificationById);


module.exports = router;
