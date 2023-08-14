const router = require('express').Router();
const { Tutor, Student, Message } = require('../../models');


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

// router.post('/', async (req, res) => {
  // const messageData = await Message.create(req.body);
  //use message_id to create notification
// include message and notification in post
// create the message and notification in the same post
// });



module.exports = router;
