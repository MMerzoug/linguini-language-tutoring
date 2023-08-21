const router = require("express").Router();
const { User, Student, Tutor, Language, LanguageLevel } = require("../../models");
const passport = require("passport");
const { checkAuthenticated, checkNotAuthenticated } = require("../../passport-config");

// endpoint for logging in
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/success", checkAuthenticated, async (req, res) => {
  const userData = await User.findOne({ where: { email: req.user.email } });
  // Check if user is student or tutor
  const student = await Student.findOne({
    include: [
      {
        model: User,
      },
    ],
    where: { user_id: userData.id },
  });

  let renderData = {};
  let url = "";

  if (student) {
    res.redirect("/studentProfile");
  } else {
    const tutor = await Tutor.findOne({
      include: [
        {
          model: User,
        },
      ],
      where: { user_id: userData.id },
    });
    res.redirect("/tutorProfile");
  }

  res.status(500).end();
});

router.post("/logout", checkAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
