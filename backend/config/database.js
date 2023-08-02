// Import Sequelize and the database connection
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Users table
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other fields as needed for user profile information (e.g., name, age, etc.)
});

// Define the Tutors table
const Tutor = sequelize.define('Tutor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qualifications: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other fields as needed for tutor profile information (e.g., experience, teaching style, etc.)
});

// Define the Languages table
const Language = sequelize.define('Language', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the associations between the tables
User.hasOne(Tutor); // Each user can be associated with one tutor
Tutor.belongsTo(User); // Each tutor belongs to one user

Tutor.belongsToMany(Language, { through: 'TutorLanguage' }); // A tutor can teach multiple languages
Language.belongsToMany(Tutor, { through: 'TutorLanguage' }); // A language can be taught by multiple tutors

// Sync the models with the database
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
