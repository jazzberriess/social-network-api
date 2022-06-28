const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.status(404).json({ message: 'No users found' });
    }
    // console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate({ path: 'friends', select: '-__v' });

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

const removeUser = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

    if (!deleteUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.status(200).json({ message: `${req.params.userId} deleted forever!` });

    //if you get time, look into also removing the thoughts and reactions for this user too
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const addFriend = async (req, res) => {
  try {
    const newFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    if (!newFriend) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res
      .status(200)
      .json({ message: `You added a new friend, ${req.params.friendId}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//remove friend from friends list
//https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save
const removeFriend = async (req, res) => {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      //for some weird reason $pull wont work but $pullAll does?
      {
        $pullAll: {
          friends: [{ _id: req.params.friendId }],
        },
      }
    );
    if (!deleteFriend) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.status(200).json({
      message: `You and ${req.params.friendId} are no longer friends.`,
    });
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
  removeUser,
  addFriend,
  removeFriend,
};
