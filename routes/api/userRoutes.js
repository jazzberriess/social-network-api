//import required router

const router = require('express').Router();

//import required user controller functions
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUserDetail,
  removeUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createNewUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUserDetail)
  .delete(removeUser);

// api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
