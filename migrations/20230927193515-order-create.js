'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
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
      customer_payments: {
        type: Sequelize.TEXT
      },
      payment_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'payments',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders')
  }
}
