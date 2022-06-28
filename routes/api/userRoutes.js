const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUserDetail,
  removeUser,
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

module.exports = router;
