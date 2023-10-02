'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('orders', 'external_order_id', {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('orders', 'external_order_id')
  }
}
