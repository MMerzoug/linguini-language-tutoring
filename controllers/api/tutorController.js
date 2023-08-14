const router = require('express').Router();
const { User, Tutor, Language, TutorRating } = require('../../models');

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

// get all tutors that teach a language 
router.get("/:language", async (req, res) => {
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
    res.status(400).json(err);
  }
});

//post route separate from the user
router.post('/create', async (req, res) => {
  try {
    const userData = await User.create({
      // ...req.body,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    const LanguagelevelData = await LanguageLevel.findOne({
      where: {
        label: req.body.language_level,
      }
    });
    const languageData = await Language.findOne({
      where: {
        name: req.body.language,
      }
    });
    const tutorData = await Tutor.create({
      user_id: userData.id,
      rating: ratingData.id,
      language_id: languageData.id,
    });
    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
