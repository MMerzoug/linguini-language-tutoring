require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(routes);

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
