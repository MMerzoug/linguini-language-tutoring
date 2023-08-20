const router = require('express').Router();
const { User, Student, Tutor } = require('../../models');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../../passport-config');
const { json } = require('sequelize');

// endpoint for logging in
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/authorization/success',
    failuireRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/success', async (req, res) => {
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
  if (student) {
    let userData = JSON.stringify({
      userType: 'student',
      student: student.get({ plain: true }),
      message: 'You are now logged in!',
    });
    res.render('studentProfile', { userData });
  } else {
    const tutor = await Tutor.findOne({
      include: [
        {
          model: User,
        },
      ],
      where: { user_id: userData.id },
    });
    let userData = {
      userType: 'tutor',
      tutor: tutor.get({ plain: true }),
      message: 'You are now logged in!',
    };
    res.render('tutorProfile', { userData });
  }
});

router.delete('/logout', checkAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
