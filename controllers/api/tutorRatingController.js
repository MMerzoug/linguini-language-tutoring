const router = require('express').Router();
const { Tutor, TutorRating } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tutorRatingData = await TutorRating.findAll({
      include: [
        {
          model: Tutor,
        },
      ],
    });
    res.status(200).json(tutorRatingData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get by tutor not just all users
//post a new tutor rating

module.exports = router;
