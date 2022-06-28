const router = require('express').Router();

const {
  getAllThoughts,
  createThought,
  getSingleThought,
} = require('../../controllers/thoughtController');

//get all thoughts: /api/thoughts
router.route('/').get(getAllThoughts);

//get single thought: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

//post thought: /api/thoughts
router.route('/').post(createThought);

module.exports = router;
