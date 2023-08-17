const router = require('express').Router();
const { User, Tutor, Student, Message, ScheduledSession } = require('../models');

// Render tutors on the homepage
router.get('/', async (req, res) => {
    try {
        const tutorData = await Tutor.findAll({ 
            include: [User] 
        });
        const tutors = tutorData.map(tutor => tutor.get({ plain: true }));
        console.log(tutors);
        
        res.render("homepage", { tutors }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});

// Render tutor data on the tutorListing page 
router.get('/tutorListing', async (req, res) => {
    try {
        const tutorData = await Tutor.findAll({
            include: [User]
        });
        const tutors = tutorData.map(tutor => tutor.get({ plain: true }));
        res.render("tutorListing", { tutors});
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
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
      res.render("studentProfile", {student});
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
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
      res.render("tutorProfile", {tutor});
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
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
      const messages = messageData.map(message => message.get({ plain: true }));
      console.log(messages)
     // 'messaging' is the name of the handlebars file 
    res.render('messaging', { messages })  
    } catch (err) {
      res.status(400).json(err);
    }
  });

// add scheduled sessions get routes
router.get('/scheduledSession', async (req, res) => {
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
   const scheduledSessions = scheduledSessionData.map(scheduledSession => scheduledSession.get({ plain: true }));
   console.log(scheduledSessions)
   res.render('scheduledSession', { scheduledSessions });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/scheduledSession/:id', async (req, res) => {
  try {
    const scheduledSessionData = await ScheduledSession.findOne({
      where: {
        id: req.params.id,
      },
      // include: [
      //   {
      //     model: Student,
      //   },
      //   {
      //     model: Tutor,
      //   }
      // ],
    });
    const scheduledSession = scheduledSessionData.get({ plain: true });
    res.render('scheduledSession', { scheduledSession });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
