const sequelize = require ('sequelize');
const connection = new sequelize('projeto','root','root', {
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;
