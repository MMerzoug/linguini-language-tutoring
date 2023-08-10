const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/connection');

// Other middleware and configuration

app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3001;
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})


