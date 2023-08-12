const router = require('express').Router();
const studentController = require('./studentController');
const tutorController = require('./tutorController');
const languageController = require('./languageController');

router.use('/students', studentController);
router.use('/tutors', tutorController);
router.use('/languages', languageController);

module.exports = router;
