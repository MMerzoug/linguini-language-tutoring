const router = require('express').Router();
const { User, Tutor, Student, Message } = require('../models');

// Render login page
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render Resgister
router.get('sign-up', async (req, res) => {
  try {
    res.render('sign-up');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render tutors on the homepage
router.get('/', async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      include: [User],
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
router.get('/tutorListing', async (req, res) => {
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

// Render student profile on the studentListing page
router.get('/studentProfile/:id', async (req, res) => {
  try {
    const studentData = await Student.findOne({
      include: [
        {
          model: User,
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    const student = studentData.get({ plain: true });
    res.render('studentProfile', { student });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render tutor profile on the tutorProfile page
router.get('/tutorProfile/:id', async (req, res) => {
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
    res.render('tutorProfile', { tutor });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Add Messaging Get Routes
router.get('/messages', async (req, res) => {
  try {
    const messageData = await Message.findAll({
      // include: [
      //   {
      //     model: Student,
      //   },
      //   {
      //     model: Tutor,
      //   }
      // ],
    });

    // maps over messageData and simplifies it for handlebars use
    // set in a variable called messages that gets passed to handlebars page
    const messages = messageData.map((message) => message.get({ plain: true }));
    console.log(messages);
    // 'messaging' is the name of the handlebars file
    res.render('messaging', { messages });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
