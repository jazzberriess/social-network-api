//import required models and schemas
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

//function to get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const allThoughts = await Thought.find()
      //remove the extra -__v field from res.json results
      .select('-__v');

    //if there are no thoughts, then return an error stating that no thoughts were found
    if (!allThoughts) {
      return res.status(404).json({ message: 'No thoughts found' });
    }

    //success message
    res.status(200).json(allThoughts);

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to get single thought
const getSingleThought = async (req, res) => {
  try {
    const singleThought = await Thought.findOne({
      _id: req.params.thoughtId,
    })
      //remove the extra -__v field from res.json results
      .select('-__v');

    //if there are no thoughts, then return an error stating that no thoughts were found
    if (!singleThought) {
      return res
        .status(404)
        .json({ message: 'No thoughts with that ID found' });
    }

    //success message
    res.status(200).json(singleThought);

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to create thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    const createdThought = await User.findOneAndUpdate(
      //if you get a chance, try to figure out how to match to userId rather than username because it is not coming through on the req.body
      { username: req.body.username },
      // { userId: req.body.userId },
      { $addToSet: { thoughts: newThought._id } },
      { runValidators: true, new: true }
    );
    // console.log(newThought);

    //if no thought was created, then return an error stating that the username was unable to be found
    if (!createdThought) {
      return res
        .status(404)
        .json({ message: 'No user with that username found' });
    }

    //success message
    res.status(200).json({ message: 'Thought added!' });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to update thought
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

    //success message
    res
      .status(200)
      .json({ message: `Thought ID ${req.params.thoughtId} updated!` });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to remove thought
const removeThought = async (req, res) => {
  try {
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    await User.findOneAndUpdate(
      { username: { $in: deleteThought.username } },
      { $pullAll: { thoughts: [{ _id: deleteThought._id }] } },
      { runValidators: true, new: true }
    );

    //if no thought was removed, then return an error stating that the ID was unable to be found
    if (!deleteThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    //success message
    res
      .status(200)
      .json({ message: `Thought ID ${req.params.thoughtId} deleted forever!` });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to create a reaction
const createReaction = async (req, res) => {
  try {
    const createdReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    //if no reaction was created, then return an error stating that the thought ID was unable to be found
    if (!createdReaction) {
      return res.status(404).json({ message: 'No thought with that ID found' });
    }

    //success message
    res.status(200).json({ message: 'Reaction added!' });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//function to remove a reaction
const removeReaction = async (req, res) => {
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //okay weirdly enough $pull works here but nowhere else???
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    );

    //if no reaction was deleted, then return an error stating that the thought ID was unable to be found
    if (!deleteReaction) {
      return res
        .status(404)
        .json({ message: 'No reaction with that ID found' });
    }

    //success message
    res.status(200).json({ message: 'Reaction removed!' });

    //error handling
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//export functions so they can be used in the routes
module.exports = {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction,
};
