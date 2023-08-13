const router = require('express').Router();
const { User, Student } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const studentData = await Student.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(studentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//post route separate from the user

module.exports = router;
