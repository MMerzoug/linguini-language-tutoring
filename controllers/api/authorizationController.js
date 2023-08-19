const router = require('express').Router();
// const { User, Student, Tutor } = require('../../models');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../../passport-config');

// endpoint for logging in
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/tutors',
    failuireRedirect: '/login',
    failureFlash: true,
  })
);

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res.status(400).json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(async () => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       // Check if user is student or tutor
//       const student = await Student.findOne({ where: { user_id: userData.id } });
//       if (student) {
//         res.json({
//           userType: 'student',
//           user: student,
//           message: 'You are now logged in!',
//         });
//         // res.render('studentProfile', { student });
//       } else {
//         const tutor = await Tutor.findOne({ where: { user_id: userData.id } });
//         res.json({
//           userType: 'tutor',
//           user: tutor,
//           message: 'You are now logged in!',
//         });
//         // res.render('tutorProfile', { tutor });
//       }
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.delete('/logout', checkAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
