const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = require("../config");

module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  //logging: console.log,
  logging: false,
});
