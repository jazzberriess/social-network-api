const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/socialNetworkApi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
