'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER SEQUENCE orders_external_order_id_seq RESTART WITH 10000;
    `)
  },

  async down(queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER SEQUENCE orders_external_order_id_seq RESTART WITH 1;
    `)
  }
}
