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


// Future feature update language level
// router.put('/:label', async (req, res) => {
//   try {
//     const langData = await LanguageLevel.update(req.body, {
//       where: {
//         label: req.params.label,
//       },
//     });
//     if (!langData[0]) {
//       res.status(404).json({ message: 'No language level with this label!' });
//       return;
//     }
//     res.status(200).json(langData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

// This is complete.
