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

module.exports = router;
