const { User } = require('../../models'); // Assuming you've defined the User model in models/user.js

// Signup: Create a new user account
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Login: Log in to an existing user account
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(200).json({ message: 'Login successful', user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
