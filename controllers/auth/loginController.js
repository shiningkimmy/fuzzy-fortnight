const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    console.log(`User ${user.username} found for email: ${email}`);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    console.log(`User ${user.username} provided valid credentials`);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username });
    console.log(`User ${user.username} logged in successfully`);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Login error:', error.message);
  }
};

