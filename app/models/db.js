const  Sequelize = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(config.dbName, config.dbUserName, config.dbPassword, {
  host: config.dbHost,
  dialect: config.dialect,
});

module.exports = sequelize;
