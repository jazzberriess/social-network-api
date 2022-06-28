const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//import helper function to format date
const { formatDate } = require('../utils/helpers');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, 'What are you thinking about?'],
      maxlength: [280, 'Sorry! The character limit for thoughts is 280.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
