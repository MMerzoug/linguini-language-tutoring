const router = require('express').Router();
const { Tutor, Student, ScheduledSession } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tutorData = await ScheduledSession.findAll({
      include: [
        {
          model: Student, 
        },
        {
            model: Tutor,
        }
      ],
    });
    res.status(200).json(tutorData);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;