const router = require('express').Router();
const { User, Tutor, Language, TutorRating } = require('../../models');

router.get('/', async (req, res, next) => {
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
   next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const tutorData = await Tutor.findOne({
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
router.get("/:language", async (req, res, next) => {
  console.log(req);
  try {
    const LanguageData = await Language.findOne({
      where: { name: req.params.language},
    });
    
    const tutors = await Tutor.findAll({
      include: [{model: User}], 
      where:{language_id: LanguageData.id}
    })
  

    if (tutors.length < 1) {
      res.status(400).json({
        message:
          "I'm sorry, there are no tutors for this language.",
      });
      return;
    }
    res.status(200).json(tutors);
  } catch (err) {
  next(err);
  }
});

//post route separate from the user
router.post('/create', async (req, res, next) => {
  try {
    const userData = await User.Create ({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    const tutorRatingData = await TutorRating.findOne({
      where: {
        id: req.params.id,
        tutor_id: req.session.user_id,
      },
    });
     const languageData = await Language.findOne({
      where: {
        name: req.body.language,
      }
    });
    const tutorData = await Tutor.create({
      // user_id: req.session.user_id,
      user_id: userData.id,
      rating: tutorRatingData.id,
      language_id: languageData.id,
    });
    res.status(200).json(tutorData);
  } catch (err) {
    next(err);
  }
  });

module.exports = router;
