const router = require('express').Router();
const { User, Student, Language, LanguageLevel } = require('../../models');
const { checkAuthenticated, checkNotAuthenticated } = require('../../passport-config');

router.get('/', checkAuthenticated, async (req, res) => {
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
router.post('/create', checkNotAuthenticated, async (req, res, next) => {
  try {
    const userData = await User.create({
      // ...req.body,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    const levelData = await LanguageLevel.findOne({
      where: {
        label: req.body.language_level,
      },
    });
    const languageData = await Language.findOne({
      where: {
        name: req.body.language,
      },
    });
    const studentData = await Student.create({
      user_id: userData.id,
      language_level_id: levelData.id,
      language_id: languageData.id,
      image_avatar: req.body.image_avatar,
    });
    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//complete
