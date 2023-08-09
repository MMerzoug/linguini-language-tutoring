const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

// Other middleware and configuration

app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
