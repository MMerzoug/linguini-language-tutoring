const router = require('express').Router();
const sequelize = require('../../config/connection');
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
//post a new tutor rating and recalculate tutor's rating from all rating records for the tutor
/* check this out from special knowledge source */
/* put this in the body of the request 

{
 "rating": 4,
 "tutor_id": 2
}

*/
// router.post('/', async (req, res) => {
//   try {
// create
// const tutorRatingData = await TutorRating.create({
//   rating: req.body.rating,
//   tutor_id: req.body.tutor_id,
// });

// calculate the average ratign
// const result = await TutorRating.findAll({
// include: {
//   model: TutorRating,
//   as: 'ratings',
//   attributes: [],
// },
// attributes: {
//   include: [[sequelize.fn('AVG', sequelize.col('ratings.rating')), 'avgRatings']],
// },
// group: ['TutorRating.id'],
// raw: true,
// where: {
//   tutor_id: req.body.tutor_id,
// },
// include: [
//   {
//     model: Tutor,
//   },
// ],
// });

// get average rating from result
// const avg = result['AVG(`rating`)'];

// do the update (not sure if this is accurate)
// await Tutor.update(
//   {
//     rating: avg,
//   },
//   {
//     where: {
//       id: req.body.tutor_id,
//     },
//   }
// );

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

router.get('/avg_rating/:tutor_id', async (req, res, next) => {
  console.log(req);
  try {
    // calculate the average rating
    const result = await TutorRating.findAll({
      where: { tutor_id: req.params.tutor_id },
      attributes: [[sequelize.fn('AVG', sequelize.col('tutorRating.rating')), 'avgRatings']],
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

/* topcoder example
app.get("/", async (req, res) => {
  try {
    const student = await db.Student.findOne({
      attributes: [sequelize.fn("COUNT", sequelize.col("id"))],
      raw: true
    });
    res.send(student);
  } catch (err) {
    res.send(err);
  }
});
*/
