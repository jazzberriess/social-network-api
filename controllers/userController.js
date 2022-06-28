const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(allUsers);
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
    }
    res.status(200).json(singleUser);
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

const updateUserDetail = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.status(200).json({ message: `${req.params.userId} updated!` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUserDetail,
};
