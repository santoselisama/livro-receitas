const sequelize = require ('sequelize');
const connection = new sequelize('projeto','sabrina','elisamasabrina123', {
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;
