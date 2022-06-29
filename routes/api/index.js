//import required routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// /api/users path
router.use('/users', userRoutes);

// /api/thoughts path
router.use('/thoughts', thoughtRoutes);

//export router
module.exports = router;
