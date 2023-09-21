const Sequelize = require('sequelize')
const db = require('../util/database')

const Customer = db.define(
  'customers',
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4()
    },
    first_name: Sequelize.STRING,
    surname: Sequelize.STRING,
    last_name: Sequelize.STRING,
    passport_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    date_of_birth: Sequelize.DATE,
    gender: {
      type: Sequelize.ENUM,
      values: ['male', 'female']
    }
  },
  {
    timestamps: true
  }
)

module.exports = Customer
