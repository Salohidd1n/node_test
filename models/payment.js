const Sequelize = require('sequelize')
const db = require('../util/database')
const Order = require('./order')

const Payment = db.define(
  'payments',
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4()
    },
    price: Sequelize.DOUBLE,
    insurance_price: Sequelize.DOUBLE,
    total: Sequelize.DOUBLE,
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'success', 'rejected'],
      defaultValue: 'pending'
    }
  },
  {
    timestamps: true
  }
)

module.exports = Payment
