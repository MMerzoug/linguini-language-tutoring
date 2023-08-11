require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
