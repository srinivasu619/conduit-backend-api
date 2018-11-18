const {
    db
} = require('../setupDB')
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = db.define('tags', {
    name: {
        type: DT.STRING,
        unique: true,
        allowNull: false
    }
});