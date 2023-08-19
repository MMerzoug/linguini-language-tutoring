const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, Student, Tutor } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const tokenData = {
      id: User.id,
    };

    // Check if user is student or tutor
    const student = await Student.findOne({ where: { user_id: userData.id } });
    if (student) {
      res.json({
        userType: 'student',
        user: student,
        message: 'You are now logged in!',
      });
      tokenData.userType = 'student';
      tokenData.user = student;
      // res.render('studentProfile', { student });
    } else {
      const tutor = await Tutor.findOne({ where: { user_id: userData.id } });
      res.json({
        userType: 'tutor',
        user: tutor,
        message: 'You are now logged in!',
      });
      tokenData.userType = 'tutor';
      tokenData.user = tutor;
      // res.render('tutorProfile', { tutor });
    }

    const token = jwt.sign(tokenData, process.env.JWT_KEY, {
      expiresIn: 60 * 60,
    });
    res.cookie('session_token', token, { maxAge: 60 * 60 * 1000 });
  } catch (err) {
    res.status(500).end();
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
