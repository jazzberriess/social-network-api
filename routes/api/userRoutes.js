const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUserDetail,
} = require('../../controllers/userController');

//get route for /api/users
router.route('/').get(getAllUsers);

//get route for single user: /api/users/:userId
router.route('/:userId').get(getSingleUser);

//post route for api/users
router.route('/').post(createNewUser);

//put route for api/users/:userId
router.route('/:userId').put(updateUserDetail);

module.exports = router;
