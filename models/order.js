'use strict'

const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Order = sequelize.define(
    'orders',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
      },
      is_confirmed: Sequelize.BOOLEAN,
      with_hotel: Sequelize.BOOLEAN,
      with_transport: Sequelize.BOOLEAN,
      has_insurance: Sequelize.BOOLEAN,
      price: Sequelize.DOUBLE,
      agent_tip: Sequelize.DOUBLE
    },
    {
      timestamps: true
    }
  )

  return Order
}
