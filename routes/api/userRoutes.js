const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
} = require('../../controllers/userController');

//get route for /api/users
router.route('/').get(getAllUsers);

//post route for api/users
router.route('/').post(createNewUser);

//get route for single user: /api/users/:userId
router.route('/:userId').get(getSingleUser);

module.exports = router;
