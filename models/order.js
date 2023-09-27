'use strict'

const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Order = sequelize.define(
    'order',
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
    Order.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    models.user.hasMany(Order, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'user_id'
    })

    Order.hasMany(models.flight, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'order_id'
    })

    models.flight.belongsTo(Order, {
      foreignKey: 'order_id'
    })

    Order.belongsTo(models.payment, { foreignKey: 'payment_id' })

    models.payment.hasOne(Order, {
      foreignKey: 'payment_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    Order.belongsToMany(models.customer, {
      through: 'orders_customers',
      foreignKey: 'order_id',
      otherKey: 'customer_id'
    })
    models.customer.belongsToMany(Order, {
      through: 'orders_customers',
      foreignKey: 'customer_id',
      otherKey: 'order_id'
    })
  }

  return Order
}
