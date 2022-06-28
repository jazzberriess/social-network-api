const router = require('express').Router();

const {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  removeThought,
} = require('../../controllers/thoughtController');

//get all thoughts: /api/thoughts
router.route('/').get(getAllThoughts);

//get single thought: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

//post thought: /api/thoughts
router.route('/').post(createThought);

//update thought: /api/thoughts/:thoughtId
router.route('/:thoughtId').put(updateThought);

//delete thought: /api/thoughts/:thoughtId
router.route('/:thoughtId').delete(removeThought);

module.exports = router;
