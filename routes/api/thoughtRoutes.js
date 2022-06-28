const router = require('express').Router();

const {
  getAllThoughts,
  createThought,
} = require('../../controllers/thoughtController');

//get all thoughts: /api/thoughts

router.route('/').get(getAllThoughts);

//post thought: /api/thoughts

router.route('/').post(createThought);

module.exports = router;
