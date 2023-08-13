const router = require('express').Router();
const studentController = require('./studentController');
const tutorController = require('./tutorController');
const languageController = require('./languageController');
const languageLevelController = require('./languageLevelController');
const scheduledSessionController = require('./scheduledSessionController');
const messageController = require('./messageController');
const tutorRatingController = require('./tutorRatingController');

router.use('/students', studentController);
router.use('/tutors', tutorController);
router.use('/languages', languageController);
router.use('/language_levels', languageLevelController);
router.use('/scheduledSessions', scheduledSessionController);
router.use('/messages', messageController);
router.use('/tutor_ratings', tutorRatingController);

module.exports = router;
