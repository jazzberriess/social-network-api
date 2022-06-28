const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const getAllThoughts = async (req, res) => {
  try {
    const allThoughts = await Thought.find();
    if (!allThoughts) {
      return res.status(404).json({ message: 'No thoughts found' });
    }

    res.status(200).json(allThoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getSingleThought = async (req, res) => {
  try {
    const singleThought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!singleThought) {
      return res
        .status(404)
        .json({ message: 'No thoughts with that ID found' });
    }
    res.status(200).json(singleThought);
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
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.status(200).json({ message: `${req.params.thoughtId} updated!` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const removeThought = async (req, res) => {
  try {
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!deleteThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res
      .status(200)
      .json({ message: `${req.params.thoughtId} deleted forever!` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  removeThought,
};
