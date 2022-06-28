const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const getAllThoughts = async (req, res) => {
  try {
    const allThoughts = await Thought.find();

    if (!allThoughts) {
      return res.status(404).json({ message: 'No thoughts found' });
    }
    // console.log(allUsers);
    res.status(200).json(allThoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    const createdThought = await User.findOneAndUpdate(
      //if you get a chance, try to figure out how to match to userId rather than username
      { username: req.body.username },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );

    if (!createdThought) {
      return res.status(404).json({ message: 'No user with that ID found' });
    }

    res.status(200).json({ message: 'Thought added!' });
  } catch (error) {}
};

module.exports = {
  getAllThoughts,
  createThought,
};
