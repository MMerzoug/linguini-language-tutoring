const router = require("express").Router();
const { LanguageLevel } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const LanguageLevelData = await LanguageLevel.findAll();
    res.status(200).json(LanguageLevelData);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const newLanguageLevel = await LanguageLevel.create(req.body);
    res.status(200).json(newLanguageLevel);
  } catch (err) {
    res.status(400).json(err);
  }
});



//no post needed unless we want to be able to add additional options on the front end. Otherwise complete

module.exports = router;

// Post only needed if we want to be able to add additional options on the front end. We do want that ability, so post was added.
// This is complete.
