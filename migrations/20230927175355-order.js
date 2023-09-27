'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      payment_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'payments',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('orders')
  }
}
