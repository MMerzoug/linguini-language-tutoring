const router = require('express').Router();
const { Message, Notification } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.findAll({});
        res.json(notifications);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID, 10);
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

router.put('/:notificationId', async (req, res) => {
    // Mark a notification as read
    try {
        const notification = await Notification.findByPk(req.params.notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification to update not found.' });
        }

        notification.read = true;
        await notification.save();

        res.json({ message: 'Notification marked as read.' });
    } catch (error) {
        res.status(500).json(error);
    }
}),

    router.delete('/:notificationId', async (req, res) => {
        // Delete a notification
        try {
            const notification = await Notification.findByPk(req.params.notificationId);
            if (!notification) {
                return res.status(404).json({ message: 'Notification to delete not found.' });
            }

            await notification.destroy();
            res.json({ message: 'Notification deleted.' });
        } catch (error) {
            res.status(500).json(error);
        }
    });

module.exports = router;

//completed