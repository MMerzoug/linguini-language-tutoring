const router = require('express').Router();
const { User, Tutor, Language } = require('../../models');

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


module.exports = router;
