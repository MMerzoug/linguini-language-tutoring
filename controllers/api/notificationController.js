const router = require('express').Router();
const { Message, Notification } = require('../../models');

router.get('/:userID', async (req, res) => {
// const notificationController = {
//     // Retrieve all notifications for a specific user
//     getAllUserNotifications: async (req, res) => {
        try {
            const userID = parseInt(req.params.userID,10);
            console.log("Fetching notifications for User ID:", userID); // logging for debugging

            const notifications = await Notification.findAll({
                include: [{
                      model: Message, 
                    }],
                where: {
                    to_id: userID
                },
                order: [['createdAt', 'DESC']]
            });

            if (!notifications.length) {
                return res.status(404).json({ message: 'No notifications found for this user.' });
            }

            res.json(notifications);
        } catch (error) {
            res.status(500).json(error);
        }
    }
);
/*
    router.put('/:notificationId', async (req, res) => {
    // Mark a notification as read
    // markAsRead: async (req, res) => {
        try {
            const notification = await Notification.findByPk(req.params.notificationId);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found.' });
            }

            notification.read = true;
            await notification.save();

            res.json({ message: 'Notification marked as read.' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    router.delete('/:notificationId', async (req, res) => {
    // Delete a notification
    // deleteNotification: async (req, res) => {
        try {
            const notification = await Notification.findByPk(req.params.notificationId);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found.' });
            }

            await notification.destroy();
            res.json({ message: 'Notification deleted.' });
        } catch (error) {
            res.status(500).json(error);
        }
    };

*/
module.exports = router;
