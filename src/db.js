const Sequelize = require('sequelize')
const dotenv = require("dotenv");
dotenv.config();


const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect:'mysql',
    host:'localhost',
    port:3306
});

module.exports = sequelize;