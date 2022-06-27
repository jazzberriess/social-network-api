const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a Username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      requried: [true, 'Please enter an email address'],
      unique: true,
      //email val by matching an email val regex
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    //thoughts: [reference the thoughts model]
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    //friends:  [references the id's of the usermodel]
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend',
      },
    ],
  },
  //indicating that we want virtuals to be included with our response, overriding the default behavior
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//create a virtual for friendcount
userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

const User = model('User', userSchema);

module.exports = User;
