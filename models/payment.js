'use strict'

const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Payment = sequelize.define(
    'payment',
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

  return Payment
}
