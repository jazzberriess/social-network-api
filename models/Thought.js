const { Schema, model } = require('mongoose');

//import reaction schema so it can be referenced in the thought model
const reactionSchema = require('./Reaction');

//import helper function to format date
const { formatDate } = require('../utils/helpers');

//create Thought schema for model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'What are you thinking about?'],
      minlength: [
        1,
        'Sorry! You have to have at least one character for a thought!',
      ],
      maxlength: [280, 'Sorry! The character limit for thoughts is 280.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //helper function to format date
      get: formatDate,
    },
    username: {
      type: String,
      required: [true, 'Please enter your username.'],
    },
    //referencing the reactionSchema
    reactions: [reactionSchema],
  },
  //indicating that we want virtuals to be included with our response, overriding the default behavior
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//create a virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});

//set model
const Thought = model('Thought', thoughtSchema);

//and export it
module.exports = Thought;
