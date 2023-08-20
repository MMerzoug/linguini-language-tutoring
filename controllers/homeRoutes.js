const router = require('express').Router();
const { User, Tutor, Student, Language, Message, ScheduledSession, LanguageLevel } = require('../models');
const { checkAuthenticated, checkNotAuthenticated } = require('../passport-config');

// Render login page
router.get('/login', checkNotAuthenticated, async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render Register
router.get('/sign-up', checkNotAuthenticated, async (req, res) => {
  try {
    res.render('sign-up');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render tutors on the homepage
router.get('/', checkNotAuthenticated, async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Language,
        },
      ],
    });
    const tutors = tutorData.map((tutor) => tutor.get({ plain: true }));
    console.log(tutors);

    res.render('homepage', { tutors });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render tutor data on the tutorListing page
router.get('/tutorListing', checkAuthenticated, async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      include: [User],
    });
    const tutors = tutorData.map((tutor) => tutor.get({ plain: true }));
    res.render('tutorListing', { tutors });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render students on the student profile page
router.get('/studentProfile/:id', checkAuthenticated, async (req, res) => {
  try {
    const studentData = await Student.findOne({
      include: [
        {
          model: User,
        },
        {
          model: Language,
        },
        {
          model: LanguageLevel,
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    const student = studentData.get({ plain: true });
    res.render('studentProfile', { student, logged_in: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render tutor profile on the tutorProfile page
router.get('/tutorProfile/:id', checkAuthenticated, async (req, res) => {
  try {
    const tutorData = await Tutor.findOne({
      include: [
        {
          model: User,
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    const tutor = tutorData.get({ plain: true });
    res.render('tutorProfile', { tutor, logged_in: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Add Messaging Get Routes
// Call users.find all to send the user list to the messaging template
router.get('/messages', checkAuthenticated, async (req, res) => {
  try {
    const messageData = await Message.findAll({});
    const userData = await User.findAll({});
    const users = userData.map((user) => user.get({ plain: true }));

    // maps over messageData and simplifies it for handlebars use
    // set in a variable called messages that gets passed to handlebars page
    // Create for loop with promises below
    const messages = [];
    for (const message of messageData) {
      const fromUser = await User.findByPk(message.from_id);
      const toUser = await User.findByPk(message.to_id);
      // Create for loop with promises
      const plainMessage = message.get({ plain: true });
      plainMessage.fromUser = fromUser.get({ plain: true });
      plainMessage.toUser = toUser.get({ plain: true });
      messages.push(plainMessage);
    }
    console.log(messages);
    // 'messaging' is the name of the handlebars file
    res.render('messaging', { messages, users, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

// add scheduled sessions get routes
router.get('/scheduledSession', checkAuthenticated, async (req, res) => {
  try {
    const scheduledSessionData = await ScheduledSession.findAll({
      include: [
        // Get me the students associated with this session
        {
          model: Student,
          // Student is associated to a user so pull that information in as well
          include: [{ model: User }],
        },
        {
          model: Tutor,
          include: [{ model: User }],
        },
      ],
    });
    const scheduledSessions = scheduledSessionData.map((scheduledSession) => scheduledSession.get({ plain: true }));
    console.log(scheduledSessions);
    res.render('scheduledSession', { scheduledSessions, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/scheduledSession/:id', checkAuthenticated, async (req, res) => {
  try {
    const scheduledSessionData = await ScheduledSession.findOne({
      where: {
        id: req.params.id,
      },
    });
    const scheduledSession = scheduledSessionData.get({ plain: true });
    res.render('scheduledSession', { scheduledSession, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/edit-profile', checkAuthenticated, async (req, res) => {
  try {
    res.render('edit-profile', { logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Render scheduledSession on tutorProfile page
router.get('/tutorProfile/:id', async (req, res) => {
  try {
    const scheduledSessionData = await ScheduledSession.findAll({
      include: [
        {
          model: Tutor,
          include: [{ model: User }],
        },
      ],
      where: {
       tutor_id: req.params.id,
      },
    });
    const scheduledSessions = scheduledSessionData.map((scheduledSession) => scheduledSession.get({ plain: true }));
    res.render('tutorProfile', { scheduledSessions, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
