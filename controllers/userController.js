//import required models and schemas
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');
const User = require('../models/User');

//function to get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
      //remove the extra -__v field from res.json results
      .select('-__v');

    //if there are no users, then return an error stating that no users were found
    if (!allUsers) {
      return res.status(404).json({ message: 'No users found' });
    }

    //success message
    res.status(200).json(allUsers);

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to get single users
const getSingleUser = async (req, res) => {
  try {
    //find a single user and display the user details + friends and thoughts
    const singleUser = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate([
        { path: 'friends', select: '-__v' },
        { path: 'thoughts', select: '-__v' },
      ]);

    //if there is no single user, then return an error stating that no user with that ID was found
    if (!singleUser) {
      return res.status(404).json({ message: 'No user with that ID found' });
    }

    //success message
    res.status(200).json(singleUser);

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to create new user
const createNewUser = async (req, res) => {
  try {
    const createUser = await User.create(req.body);

    //success message
    res.status(200).json({ message: 'New user added!', createUser });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to update user
const updateUserDetail = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    //if there are no updatedUser, then return an error stating that no user with that ID was found
    if (!updateUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    //success message
    res.status(200).json({ message: `${req.params.userId} updated!` });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to remove user
const removeUser = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

    //update friends list for all users that have the removed user in their friends list
    await User.updateMany(
      //i want to remove the deletedUser_ID from ALL other users friends list.
      { _id: { $in: deleteUser.friends } },
      { $pullAll: { friends: [{ _id: deleteUser._id }] } }
    );

    await Thought.deleteMany(
      //i want to remove the thoughts of deletedUser_ID from the thoughts array.
      { _id: { $in: deleteUser.thoughts } },
      { $pullAll: { thoughts: [{ username: deleteUser.username }] } }
    );

    //if there are no deleteUser, then return an error stating that no user with that ID was found
    if (!deleteUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    //success message
    res.status(200).json({
      message: `${req.params.userId} deleted forever! ${deleteUser.username}'s thoughts are gone too.`,
    });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to add friend
const addFriend = async (req, res) => {
  try {
    const newFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    //reciprocal friends! Add user to corresponding friends' friend list
    await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      { runValidators: true, new: true }
    );

    //if there are no newFriend, then return an error stating that no user with that ID was found
    if (!newFriend) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    //success message
    res.status(200).json({ message: `You added a new friend, ${req.params.friendId}!` });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//remove friend from friends list
//https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save
const removeFriend = async (req, res) => {
  try {
    //delete a friend
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      //for some weird reason $pull wont work but $pullAll does?
      { $pullAll: { friends: [{ _id: req.params.friendId }] } },
      { runValidators: true, new: true }
    );
    //delete reciprocal friend. Remove user from friend's friend list
    await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pullAll: { friends: [{ _id: req.params.userId }] } },
      { runValidators: true, new: true }
    );

    //if there are no deleteFriend, then return an error stating that no user with that ID was found
    if (!deleteFriend) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    //success message
    res.status(200).json({
      message: `You and ${req.params.friendId} are no longer friends.`,
    });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//export functions so they can be used in the routes
module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUserDetail,
  removeUser,
  addFriend,
  removeFriend,
};
