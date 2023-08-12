const router = require('express').Router();
const studentController = require('./studentController');
const tutorController = require('./tutorController');
const languageController = require('./languageController');
const languageLevelController = require('./languageLevelController');

router.use('/students', studentController);
router.use('/tutors', tutorController);
router.use('/languages', languageController);
router.use('/language_level', languageLevelController);

module.exports = router;
