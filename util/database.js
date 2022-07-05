const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecourse', 'root', 'Lucecita0510', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
