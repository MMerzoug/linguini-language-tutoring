const localStrategy = require('passport-local').Strategy;
const { User, Student, Tutor } = require('./models');

const authenticateUser = async (email, password, done) => {
  try {
    const userData = await User.findOne({ where: { email: email } });
    if (userData == null) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    const validPassword = await userData.checkPassword(password);
    if (!validPassword) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    return done(null, userData.get({ plain: true }));
    // // Check if user is student or tutor
    // const student = await Student.findOne({ where: { user_id: userData.id } });
    // if (student) {
    //   //   res.json({
    //   //     userType: 'student',
    //   //     user: student,
    //   //     message: 'You are now logged in!',
    //   //   });
    //   return done(null, student.get({ plain: true }));
    // } else {
    //   const tutor = await Tutor.findOne({ where: { user_id: userData.id } });
    //   //   res.json({
    //   //     userType: 'tutor',
    //   //     user: tutor,
    //   //     message: 'You are now logged in!',
    //   //   });
    //   return done(null, tutor.get({ plain: true }));
    // }
  } catch (err) {
    return done(err);
  }
};

function initializePassport(passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const userData = await User.findOne({ where: { email: email } });
    return done(null, userData.get({ plain: true }));
  });
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }
  next();
}

module.exports = {
  initializePassport,
  checkAuthenticated,
  checkNotAuthenticated,
};
