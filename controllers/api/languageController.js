const router = require('express').Router();
const { Language, Tutor } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const LanguageData = await Language.findAll();

    res.status(200).json(LanguageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Allows new languages to be added to be able to add additional languages on the front end.
router.post('/', async (req, res) => {
  try {
    const newLanguage = await Language.create({
      name: req.body.name,
    });
    res.status(200).json(newLanguage);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
