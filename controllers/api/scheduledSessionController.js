const router = require('express').Router();
const { Tutor, Student, ScheduledSession } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const scheduledSessionData = await ScheduledSession.findAll({
      include: [
        {
          model: Student, 
        },
        {
            model: Tutor,
        }
      ],
    });
    res.status(200).json(scheduledSessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//post new session

module.exports = router;