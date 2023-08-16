require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // sequelize = new Sequelize(process.env.JAWSDB_URL);
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    logging: console.log
  });
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: console.log 
  });
}

module.exports = sequelize;
