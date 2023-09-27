'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.describeTable('orders').then((tableDefinition) => {
      if (!tableDefinition.agent_tip) {
        return queryInterface.addColumn('orders', 'agent_tip', {
          type: Sequelize.DOUBLE
        })
      } else {
        return Promise.resolve(true)
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'agent_tip')
  }
}
