//connect to db using mongoose
const { connect, connection } = require('mongoose');
//require dotenv package
require('dotenv').config();

//connect to mongoDb
connect(process.env.MONGO_DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
