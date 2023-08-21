// Write the following code:

// messages: This route should get all the messages for a particular user.
// complete

// /messages/new: This route should create a new message.
// complete

// /messages/:id: This route should get a particular message.
// /messages/:id/edit: This route should edit a particular message.
// /messages/:id/delete: This route should delete a particular message.

const router = require("express").Router();
const { Tutor, Student, Message, Notification } = require("../../models");
const dayjs = require("dayjs");
const { checkAuthenticated } = require("../../passport-config");

// This route gets all the messages for the current user
router.get("/", checkAuthenticated, async (req, res) => {
  try {
    const messageData = await Message.findAll({
      include: [
        {
          model: Student,
        },
        {
          model: Tutor,
        },
      ],
    });
    res.status(200).json(messageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// This route creates a new message
router.post("/", checkAuthenticated, async (req, res) => {
  let transaction;
  try {
    // Start a new transaction
    transaction = await Message.sequelize.transaction();

    // Create the message
    const messageData = await Message.create(
      {
        // from_id: req.session.user_id,
        // The following line is testing only. Once Auth is complete remove this line and uncomment the above line
        from_id: req.user.id,
        to_id: req.body.to_id,
        message_text: req.body.message_text,
        sent: dayjs(),
      },
      { transaction }
    );

    // Use message ID to create a notification
    const notificationData = await Notification.create(
      {
        message_id: messageData.id,
        to_id: req.body.to_id,
        // type: req.body.type,
        type: "alert",
        content: "This is an alert",
        read: true,
        // any other necessary fields for Notification
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();

    res.status(201).json({ messageData, notificationData });
  } catch (err) {
    // If there's any error, rollback the transaction
    if (transaction) await transaction.rollback();
    res.status(400).json(err);
  }
});

// This route allows a sent message to be updated
router.put("/:id", checkAuthenticated, async (req, res) => {
  try {
    const messageData = await Message.update(
      {
        message_text: req.body.message_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(messageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route allows a sent message to be deleted
router.delete("/:id", checkAuthenticated, async (req, res) => {
  try {
    const messageData = await Message.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(messageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//both get and post routes work
