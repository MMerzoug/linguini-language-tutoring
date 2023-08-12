const router = require('express').Router();
const studentController = require('./studentController');
const tutorController = require('./tutorController');

router.use('/students', studentController);
router.use('/tutors', tutorController);

module.exports = router;
