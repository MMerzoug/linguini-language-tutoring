// Migrating code to define tables to where it belongs

// Import Sequelize and the database connection
const { Sequelize, DataTypes } = require('sequelize');

// Database Name, Username, and Password: Make sure to replace 'database_name', 'username', and 'password' with your actual MySQL database name, username, and password, respectively.
const sequelize = new Sequelize('onlineLanguage_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Sync the models with the database
// The sequelize.sync({ force: false }) call will ensure that the defined models are synchronized with the database. However, be cautious when using force: true, as it can drop existing tables and re-create them. For production environments, you may consider using migrations to manage database changes safely.

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database and tables are synced!');
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });

// Export the models for use in other parts of the app
module.exports = {
  User,
  Tutor,
  Language,
  sequelize, // Export the Sequelize instance to access other Sequelize features if needed
};
