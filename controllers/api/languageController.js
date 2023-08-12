const router = require('express').Router();
const { Language } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const LanguageData = await Language.findAll();
    res.status(200).json(LanguageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
