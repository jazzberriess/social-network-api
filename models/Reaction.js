const { Schema, Types } = require('mongoose');

//import helper function to format date
const { formatDate } = require('../utils/helpers');

//create Reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Oops! You need at least one character for a reaction!'],
      maxlength: [280, 'Sorry! Reactions can only be up to 280 characters.'],
    },
    username: {
      type: String,
      required: [true, 'Please enter your username.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //helper function to format date
      get: formatDate,
    },
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

//export schema
module.exports = reactionSchema;
