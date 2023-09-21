const Sequelize = require('sequelize')
const db = require('../util/database')
const Flight = require('./flight')
const Payment = require('./payment')
const Customer = require('./customer')
const User = require('./user')

const Order = db.define(
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
    customer_payments: {
      type: Sequelize.TEXT
    }
  },
  {
    timestamps: true
  }
)

User.hasMany(Order, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'user_id'
})

Order.belongsTo(User, {
  foreignKey: 'user_id'
})

Order.hasMany(Flight, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'order_id'
})

Flight.belongsTo(Order, {
  foreignKey: 'order_id'
})

Order.belongsTo(Payment, { foreignKey: 'payment_id' })

Payment.hasOne(Order, {
  foreignKey: 'payment_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Order.belongsToMany(Customer, {
  through: 'orders_customers',
  foreignKey: 'order_id',
  otherKey: 'customer_id'
})
Customer.belongsToMany(Order, {
  through: 'orders_customers',
  foreignKey: 'customer_id',
  otherKey: 'order_id'
})

module.exports = Order
