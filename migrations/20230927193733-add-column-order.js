'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'agent_tip', {
      type: Sequelize.DataTypes.DOUBLE
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'agent_tip')
  }
}
