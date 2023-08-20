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
router.get('/tutorProfile/', checkAuthenticated, async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.user.email } });
    const tutorData = await Tutor.findOne({
      include: [
        {
          model: User,
        },
        {
          model: Language,
        },
      ],
      where: {
        user_id: userData.id,
      },
    });
    const tutor = tutorData.get({ plain: true });
    const scheduledSessionData = await ScheduledSession.findAll({
      include: [
        {
          model: Tutor,
          include: [{ model: User }],
        },
      ],
      where: {
        tutor_id: tutor.id,
      },
    });
    const scheduledSessions = scheduledSessionData.map((scheduledSession) => scheduledSession.get({ plain: true }));
    res.render('tutorProfile', { tutor, logged_in: true, scheduledSessions });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render student profile on the studentProfile page
router.get('/studentProfile/', checkAuthenticated, async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.user.email } });
    const studentData = await Tutor.findOne({
      include: [
        {
          model: User,
        },
        {
          model: Language,
        },
      ],
      where: {
        user_id: userData.id,
      },
    });
    const student = studentData.get({ plain: true });
    const tutorRatingData = await tutorRating.findAll({
      include: [
        {
          model: Student,
          include: [{ model: User }],
        },
      ],
      where: {
        student_id: student.id,
      },
    });
    // Athena this needs to be math average of all ratings (not .map)
    const tutorRatings = tutorRatingData.map((tutorRating) => tutorRating.get({ plain: true }));
    res.render('studentProfile', { student, logged_in: true, tutorRatings });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});



// Add Messaging Get Routes
// Call users.find all to send the user list to the messaging template
router.get('/messages', checkAuthenticated, async (req, res) => {
  try {
    let messageData = await Message.findAll();
    let userData = await User.findAll();
    
    // Don't include currently logged in user in the list of users. This list is used to select the user to whom the message will be sent. 
    // It doesn't make sense to the send the message to user ABC from user ABC
    let plainUsers = userData.map((user) => user.get({plain: true}));
    let filteredUsers = plainUsers.filter((user) => user.id !== req.user.id);

    //filter messages to only include those that are either from OR to the currently logged in user.
    let plainMessages = messageData.map((message) => message.get({plain: true}));
    let filteredMessages = plainMessages.filter((message) => (message.from_id === req.user.id || message.to_id === req.user.id));

    // maps over messageData and simplifies it for handlebars use
    // set in a variable called messages that gets passed to handlebars page
    // Create for loop with promises below
    let messages = [];
    for (let message of filteredMessages) {
      let fromUser = await User.findByPk(message.from_id);
      let toUser = await User.findByPk(message.to_id);
      // Create for loop with promises
      message.fromUser = fromUser.get({ plain: true });
      message.toUser = toUser.get({ plain: true });
      messages.push(message);
    }
    console.log(messages);
    // 'messaging' is the name of the handlebars file
    res.render('messaging', { messages, filteredUsers, logged_in: true });
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





module.exports = router;
