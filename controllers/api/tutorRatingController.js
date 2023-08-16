const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Tutor, TutorRating } = require('../../models');

// get all tutor ratings
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

// post a new tutor rating
router.post('/', async (req, res) => {
  try {
    // create
    const tutorRatingData = await TutorRating.create({
      rating: req.body.rating,
      tutor_id: req.body.tutor_id,
    });

    res.status(201).json(tutorRatingData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get tutor rating by tutor id and updates the tutor's rating in the tutor table
router.get('/avg_rating/:tutor_id', async (req, res, next) => {
  console.log(req);
  try {

    const result = await TutorRating.findAll({
      where: { tutor_id: req.params.tutor_id },
      attributes: [[sequelize.fn('AVG', sequelize.col('tutorRating.rating')), 'avgRatings']],
    });

    const ratingUpdate = await Tutor.update(
      {
        rating: result[0].dataValues.avgRatings,
      },
      {
        where: {
          id: req.params.tutor_id,
        },
      }
    );

    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
