const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.port || 3001;
const app = express();

//middlewear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting up routes
app.use(routes);

//listen on PORT once db is connected
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`And we're live, listening on port ${PORT}!`);
  });
});
