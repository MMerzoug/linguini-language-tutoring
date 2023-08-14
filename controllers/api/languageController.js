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

router.get("/findOne", async (req, res) => {
  console.log(req);
  try {
    const LanguageData = await Language.findOne({
      where: { name: req.body.name },
    });
    
    const tutors = await Tutor.findAll({
      where:{language_id: LanguageData.id}
    })
  

    if (!LanguageData) {
      res.status(400).json({
        message:
          "This language is not available at this time. Come back again soon.",
      });
      return;
    }
    res.status(200).json(tutors);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Below here are easy routes

//get by id as a single language... Add this.

//no post needed unless we want to be able to add additional languages on the front end. Otherwise complete

router.get("/find/spanish", async (req, res) => {
  console.log(req);
  try {
    const LanguageData = await Language.findOne({
      where: { name: "Spanish" },
    });
    const tutors = await Tutor.findAll({
      where:{language_id: LanguageData.id}
    })
    if (!LanguageData) {
      res.status(400).json({
        message:
          "This language is not available at this time. Come back again soon.",
      });
      return;
    }
    res.status(200).json(tutors);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/find/french", async (req, res) => {
  console.log(req);
  try {
    const LanguageData = await Language.findOne({
      where: { name: "French" },
    });

    if (!LanguageData) {
      res.status(400).json({
        message:
          "This language is not available at this time. Come back again soon.",
      });
      return;
    }
    res.status(200).json(LanguageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

// const test = await Language.findOne()
