const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      //add unique and trimmed to the username
    },
    email: {
      type: String,
      requried: true,
      //add uniquie and email val options
    },
    //thoughts: [reference the thoughts model]?
    //friends:  [references the id's of the usermodel]
  },
  //indicating that we want virtuals to be included with our response, overriding the default behavior
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

const User = model('user', userSchema);

module.exports = User;
