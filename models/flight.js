const Sequelize = require('sequelize')
const db = require('../util/database')

const Flight = db.define(
  'flights',
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

module.exports = Flight
