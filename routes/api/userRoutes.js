const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUserDetail,
  removeUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

//get route for all users: /api/users
router.route('/').get(getAllUsers);

//get route for single user: /api/users/:userId
router.route('/:userId').get(getSingleUser);

//post route for single user: api/users
router.route('/').post(createNewUser);

//put route for single user: api/users/:userId
router.route('/:userId').put(updateUserDetail);

//delete route for single user: api/users/:userId
router.route('/:userId').delete(removeUser);

//post route for adding a friend: api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(addFriend);

//delete route for removing a friend:  pi/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
