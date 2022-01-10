const sequelize = require ('sequelize');
const connection = new sequelize('projeto','root','frutas123', {
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;
