const router = require('express').Router();
const { Tutor, Student, Message, Notification } = require('../../models');
const dayjs = require("dayjs");

router.get('/', async (req, res) => {
  try {
    const messageData = await Message.findAll({
      include: [
        {
          model: Student,
        },
        {
          model: Tutor,
        }
      ],
    });
    res.status(200).json(messageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  let transaction;
  try {
    // Start a new transaction
    transaction = await Message.sequelize.transaction();

    // Create the message
    const messageData = await Message.create({
      from_id: req.body.from_id,
      to_id: req.body.to_id,
      message_text: req.body.message_text,

      sent: dayjs()
      
    }, { transaction });

    // Use message ID to create a notification
    const notificationData = await Notification.create({
      message_id: messageData.id,
      to_id: req.body.to_id,
      type: req.body.type,
      content: req.body.content,
      read: req.body.read,
      // any other necessary fields for Notification
    }, { transaction });

    // Commit the transaction
    await transaction.commit();

    res.status(201).json({ messageData, notificationData });
  } catch (err) {
    // If there's any error, rollback the transaction
    if (transaction) await transaction.rollback();
    res.status(400).json(err);
  }
});

module.exports = router;

//both get and post routes work
