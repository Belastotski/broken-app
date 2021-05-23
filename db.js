const Sequelize = require('sequelize');

const sequelize = new Sequelize('gamedb', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres',
    port: '5433',
    logging: false
})
const User = require('./models/user')(sequelize,Sequelize);
const Game = require('./models/game')(sequelize,Sequelize);
sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = {sequelize, User, Game};
