const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetworkApi', {
  useNewUrlParse: true,
  useUnifiedTopology: true,
});

module.exports = connection;
