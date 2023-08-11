const router = require('express').Router();
const { User } = require('../../models'); // Assuming you've defined the User model in models/user.js

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
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


// Signup: Create a new user account
// exports.signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = await User.create({ username, email, password });
//     res.status(201).json({ message: 'User created successfully!', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error });
//   }
// };

// // Login: Log in to an existing user account
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user || user.password !== password) {
//       res.status(401).json({ message: 'Invalid email or password' });
//     } else {
//       res.status(200).json({ message: 'Login successful', user });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// };
