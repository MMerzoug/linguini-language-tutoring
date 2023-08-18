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
router.post('/', async (req, res) => {
  try {
    const { student_id, tutor_id, session_begin, session_end, meeting_link } = req.body;

    if(!student_id || !tutor_id || !session_begin ||!session_end ||!meeting_link) {
      return res.status(400).json({ message: 'Please provide studentId, tutorId, and scheduledTime for the session.' });
    }

    const newScheduledSession = await ScheduledSession.create({
      student_id,
      tutor_id,
      session_begin,
      session_end,
      meeting_link
    });

    res.status(201).json(newScheduledSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:'Failed to schedule a new session', error: err});
  }
});

// Write a delete route for the ScheduledSession model
router.delete('/:id', async (req, res) => {
  try {
    const scheduledSessionData = await ScheduledSession.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(scheduledSessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//completed