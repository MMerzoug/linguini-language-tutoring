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

//get by id as a single language... Add this.

//no post needed unless we want to be able to add additional languages on the front end. Otherwise complete

module.exports = router;
