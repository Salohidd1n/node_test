const Sequelize = require('sequelize')
const db = require('../util/database')

const User = db.define(
  'users',
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4()
    },
    first_name: Sequelize.STRING,
    second_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: Sequelize.STRING,
    thumb: Sequelize.STRING,
    role: Sequelize.UUID
  },
  {
    timestamps: true
  }
)

module.exports = User
