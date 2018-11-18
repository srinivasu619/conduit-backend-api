const {
  db
} = require('../setupDB')
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = db.define('users', {
  username: {
    type: DT.STRING(32),
    allowNull: false,
    unique: true
  },
  email: {
    type: DT.STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: DT.STRING,
    defaultValue: 'https://static.productionready.io/images/smiley-cyrus.jpg ',
  },
  bio: {
    type: DT.TEXT
  },
  token: {
    type: DT.STRING,
    unique: true
  }
})