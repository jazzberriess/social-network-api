const router = require('express').Router();

const { getAllUsers } = require('../../controllers/userController');

//route for /api/users
router.route('/').get(getAllUsers);

module.exports = router;
