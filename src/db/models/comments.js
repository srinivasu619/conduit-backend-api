const {
    db
} = require('../setupDB')
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = db.define('comments',{
    body: {
        type: DT.TEXT,
        allowNull: false
    }
})