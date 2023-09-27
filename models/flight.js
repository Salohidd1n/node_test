'use strict'

const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Flight = sequelize.define(
    'flight',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
      },
      info: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.ENUM,
        values: ['one_way', 'round_trip', 'difficult_route']
      },
      price: Sequelize.DOUBLE
    },
    {
      timestamps: true
    }
  )

  return Flight
}
