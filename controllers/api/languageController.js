const router = require("express").Router();
const { Language, Tutor } = require("../../models");

router.get("/findAll", async (req, res) => {
  try {
    const LanguageData = await Language.findAll();

    res.status(200).json(LanguageData);
  } catch (err) {
    res.status(400).json(err);
  }
});



// Below here are easy routes

//get by id as a single language... Add this.

//no post needed unless we want to be able to add additional languages on the front end. Otherwise complete


module.exports = router;

// const test = await Language.findOne()
