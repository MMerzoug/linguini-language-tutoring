const router = require('express').Router();
const { LanguageLevel } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const LanguageLevelData = await LanguageLevel.findAll();
    res.status(200).json(LanguageLevelData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
