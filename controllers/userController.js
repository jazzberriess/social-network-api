const User = require('../models/User');

getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.status(404).json({ message: 'No users found' });
    } else {
      res.json(allUsers);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
};
