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
      agent_tip: Sequelize.DOUBLE,
      customer_payments: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: true
    }
  )

  Order.associate = (models) => {
    Order.belongsTo(models.users, {
      foreignKey: 'user_id'
    })

    models.users.hasMany(Order, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'user_id'
    })

    Order.hasMany(models.flights, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'order_id'
    })

    models.flights.belongsTo(Order, {
      foreignKey: 'order_id'
    })

    Order.belongsTo(models.payments, { foreignKey: 'payment_id' })

    models.payments.hasOne(Order, {
      foreignKey: 'payment_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    Order.belongsToMany(models.customers, {
      through: 'orders_customers',
      foreignKey: 'order_id',
      otherKey: 'customer_id'
    })
    models.customers.belongsToMany(Order, {
      through: 'orders_customers',
      foreignKey: 'customer_id',
      otherKey: 'order_id'
    })
  }

  return Order
}
