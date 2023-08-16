const router = require('express').Router();
const { User, Tutor } = require('../models');

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

// Render tutor profile on the tutorProfile page 


router.get('/tutorProfile', async (req, res) => {
    res.render("tutorProfile.handlebars");  
});

router.get('/studentProfile', async (req, res) => {
    res.render("studentProfile.handlebars");  
});

router.get('/tutorListing', async (req, res) => {
    res.render("tutorListing.handlebars");  
});

module.exports = router;
