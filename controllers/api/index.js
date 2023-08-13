const router = require('express').Router();
const studentController = require('./studentController');
const tutorController = require('./tutorController');
const languageController = require('./languageController');
const languageLevelController = require('./languageLevelController');
const scheduledSessionController = require('./scheduledSessionController');
const messageController = require('./messageController');

router.use('/students', studentController);
router.use('/tutors', tutorController);
router.use('/languages', languageController);
router.use('/language_level', languageLevelController);
router.use('/scheduledSession', scheduledSessionController);
router.use('/message', messageController);


module.exports = router;
