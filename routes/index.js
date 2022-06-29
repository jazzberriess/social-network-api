//import required routes and router
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//handling for if user enters an invalid path
router.use((req, res) => {
  res.send('Oops! Wrong way!');
});

//export router
module.exports = router;
