const {
    db
} = require('../setupDB')
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;


module.exports = db.define('credentials',{
    password: {
        type: DT.STRING,
        allowNull: false
    }
});