const router = require('express').Router();
const { User, Tutor, Student } = require('../models');

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

module.exports = router;
