const {
    db
} = require('../setupDB')
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = db.define('articles', {
    title: {
        type: DT.STRING,
        allowNull: false
    },
    slug: {
        type: DT.STRING,
        allowNull: false
    },
    description: {
        type: DT.STRING,
        allowNull: false
    },
    body: {
        type: DT.TEXT,
        allowNull: false
    }
})