const router = require('express').Router();
const { User, Tutor} = require('../models');

//localhost:3001/
router.get('/', async (req, res) => {
    const tutorData = await Tutor.findAll({
        include:[User]
    })
    //console.log(tutorData)
    const tutors= tutorData.map((tutor) => tutor.get({ plain: true }));
    console.log(tutors)
    res.render("homepage.handlebars", {tutors})
})

router.get('/tutorProfile', async (req, res) => {
    res.render("tutorProfile.handlebars")
})

router.get('/studentProfile', async (req, res) => {
    res.render("studentProfile.handlebars")
})

module.exports = router;