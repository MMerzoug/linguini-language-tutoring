const sequelize = require('../config/connection');
const seedLanguages = require('./languageSeedData');
const seedTutors = require('./tutorSeedData');
const seedUsers = require('./userSeedData');
const seedRatings = require('./ratingSeedData');

const seedTheData = async () => {
  await sequelize.sync({ force: true });
  await seedLanguages();
  await seedTutors();
  await seedUsers();
  await seedRatings();
  process.exit(0);
};

seedTheData();
