const router = require('express').Router();
const { User, Tutor } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(tutorData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//post route separate from the user

module.exports = router;
