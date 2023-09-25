const Notification = require('../models/Notification');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { user, message } = req.body;

        const newNotification = new Notification({
            user,
            message,
        });

        await newNotification.save();

        return res.status(201).json({ message: 'Notification created successfully.' });
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();

        return res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return handleError(res, 404, 'Notification not found.');
        }

        return res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Update notification by ID
exports.updateNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const updatedNotificationData = req.body;

        // Update the notification data
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { $set: updatedNotificationData },
            { new: true }
        );

        if (!updatedNotification) {
            return handleError(res, 404, 'Notification not found.');
        }

        return res.status(200).json(updatedNotification);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Delete notification by ID
exports.deleteNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id;

        // Delete the notification by ID
        const deletedNotification = await Notification.findByIdAndRemove(notificationId);

        if (!deletedNotification) {
            return handleError(res, 404, 'Notification not found.');
        }

        return res.status(200).json({ message: 'Notification deleted successfully.' });
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};
