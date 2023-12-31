const router = require('express').Router();
const { User, Tutor, Language, TutorRating } = require('../../models');
const { checkAuthenticated, checkNotAuthenticated } = require('../../passport-config');

// base url is /api/tutors/
router.get('/', checkAuthenticated, async (req, res, next) => {
  try {
    const tutorData = await Tutor.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Language,
        }
      ],
    });
    const tutors = tutorData.map((tutor) => tutor.get({ plain: true }));
    res.render('tutorListing', { tutors });
    // res.status(200).json(tutorData);
  } catch (err) {
    next(err);
  }
});

router.get('/:tutor_id', checkAuthenticated, async (req, res, next) => {
  try {
    const tutorData = await Tutor.findOne({
      where: { id: req.params.tutor_id },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(tutorData);
  } catch (err) {
    next(err);
  }
});

// get all tutors that teach a language
router.get('/language/:language', checkAuthenticated, async (req, res, next) => {
  console.log(req);
  try {
    const LanguageData = await Language.findOne({
      where: { name: req.params.language },
    });

    const tutors = await Tutor.findAll({
      include: [{ model: User }],
      where: { language_id: LanguageData.id },
    });

    if (tutors.length < 1) {
      res.status(400).json({
        message: "I'm sorry, there are no tutors for this language.",
      });
      return;
    }
    res.status(200).json(tutors);
  } catch (err) {
    next(err);
  }
});

//post route separate from the user
router.post('/create', checkNotAuthenticated, async (req, res, next) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      image_avatar: req.body.image_avatar,
    });
    const tutorRatingData = await TutorRating.findOne({
      where: {
        rating: req.body.rating,
      },
    });
    const languageData = await Language.findOne({
      where: {
        name: req.body.language,
      },
    });
    const tutorData = await Tutor.create({
      user_id: userData.id,
      rating: tutorRatingData?.id,
      language_id: languageData.id,
      image_avatar: req.body.image_avatar,
    });
    res.status(200).json(tutorData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// complete
