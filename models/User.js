const { Schema, model } = require('mongoose');

//create User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a Username'],
      unique: [true],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email address'],
      unique: [true],
      //make the email address lowercase
      lowercase: true,
      //trim trailing spaces
      trim: true,
      //email validation by matching an email validation regex
      match: [
        /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Please enter a valid email address.',
      ],
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
        ref: 'User',
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

//set model
const User = model('User', userSchema);

//and export it
module.exports = User;
