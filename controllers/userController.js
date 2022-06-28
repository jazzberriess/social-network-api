const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.status(404).json({ message: 'No users found' });
    } else {
      res.status(200).json(allUsers);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId }).select(
      '-__v'
    );

    if (!singleUser) {
      return res.status(404).json({ message: 'No user with that ID found' });
    } else {
      res.status(200).json(singleUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createNewUser = async (req, res) => {
  try {
    const createUser = await User.create(req.body);
    res.status(200).json({ message: 'New user added!', createUser });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
};
