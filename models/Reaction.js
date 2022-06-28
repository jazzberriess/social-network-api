const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, 'Sorry! Reactions can only be up to 280 characters.'],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  //indicating that we want virtuals to be included with our response, overriding the default behavior
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//function to format the createdAt date and time to english GB style and 24 hr time.
const formatDate = (createdAt) => {
  let date = Intl.DateTimeFormat('en-GB', {
    hour12: false,
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return date.format(createdAt);
};

module.exports = reactionSchema;
