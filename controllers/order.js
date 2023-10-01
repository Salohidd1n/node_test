const {
  orders: Order,
  flights: Flight,
  payments: Payment,
  customers: Customer,
  users: User,
  Sequelize
} = require('../models')
const Op = Sequelize.Op

exports.createOrder = async (req, res, next) => {
  const {
    is_confirmed,
    with_hotel,
    with_transport,
    has_insurance,
    price,
    flights,
    payment,
    customers,
    user_id,
    customer_payments,
    agent_tip
  } = req.body

  try {
    const promises = customers.map((user) =>
      Customer.findOrCreate({
        where: {
          passport_number: user.passport_number
        },
        defaults: {
          ...user,
          date_of_birth: new Date(user.date_of_birth)
        }
      })
    )

    const resultCustomers = await Promise.all(promises)

    const resultPayment = await Payment.create({
      ...payment
    })

    const resultOrder = await Order.create({
      is_confirmed,
      with_hotel,
      with_transport,
      has_insurance,
      price,
      agent_tip,
      payment_id: resultPayment.id,
      user_id: user_id,
      customer_payments: JSON.stringify(customer_payments)
    })

    const items = flights.map((item) => ({
      ...item,
      info: JSON.stringify(item.info),
      order_id: resultOrder.id
    }))

    await Flight.bulkCreate(items)

    const promisesCustomer = resultCustomers.map((item) =>
      resultOrder.addCustomer(item[0])
    )

    await Promise.all(promisesCustomer)

    res.status(201).json({
      message: 'Order created successfully!',
      order: resultOrder
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create order: ' + String(err)
    })
  }
}

exports.getOrders = async (req, res, next) => {
  try {
    const page = req.query.page || 0
    const limit = req.query.limit || 10
    const ignoredAttributes = { exclude: ['createdAt', 'updatedAt'] }
    const userIds = req.query?.user_ids?.split(',') || []
    const startDate = req.query?.start_date
    const endDate = req.query?.end_date

    let filter = {}
    if (startDate && endDate)
      filter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      }

    if (userIds.length > 0) filter.user_id = userIds

    const orders = await Order.findAndCountAll({
      include: [
        {
          model: Payment,
          attributes: ignoredAttributes
        },
        {
          model: User,
          attributes: ignoredAttributes
        },
        {
          model: Flight,
          attributes: ignoredAttributes
        },
        {
          model: Customer,
          attributes: ignoredAttributes,
          through: { attributes: [] }
        }
      ],
      attributes: {
        exclude: ['payment_id', 'user_id']
      },
      where: {
        ...filter
      },

      offset: page,
      limit: limit,
      order: [['createdAt', 'DESC']]
    })

    res.status(201).json({
      message: 'Success',
      orders
    })
  } catch (err) {
    console.log('err===>', err)
    res.status(500).json({
      message: 'Failed to create order: ' + String(err)
    })
  }
}

exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.order_id

    const ignoredAttributes = { exclude: ['createdAt', 'updatedAt'] }
    const order = await Order.findOne({
      where: {
        id: orderId
      },
      include: [
        {
          model: Payment,
          attributes: ignoredAttributes
        },
        {
          model: User,
          attributes: ignoredAttributes
        },
        {
          model: Flight,
          attributes: ignoredAttributes
        },
        {
          model: Customer,
          attributes: ignoredAttributes,
          through: { attributes: [] }
        }
      ],
      attributes: {
        exclude: ['payment_id', 'user_id']
      }
    })

    res.status(201).json({
      message: 'Success',
      order
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create order: ' + String(err)
    })
  }
}

exports.confirmOrder = async (req, res, next) => {
  const { is_confirmed, with_hotel, with_transport, has_insurance, agent_tip } =
    req.body
  const orderId = req.params.order_id
  Order.findByPk(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found!' })
      }
      order.is_confirmed = is_confirmed
      order.with_hotel = with_hotel
      order.with_transport = with_transport
      order.has_insurance = has_insurance
      order.agent_tip = agent_tip

      return order.save()
    })
    .then((result) => {
      res.status(200).json({ message: 'Order updated!', order: result })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Failed to update order: ' + String(err)
      })
    })
}

exports.updateOrder = async (req, res, next) => {
  const {
    is_confirmed,
    with_hotel,
    with_transport,
    has_insurance,
    price,
    flights,
    payment,
    customers,
    user_id,
    customer_payments,
    agent_tip
  } = req.body
  try {
    const orderId = req.params.order_id

    const updateCustomers = customers.map(async (item) => {
      if (item.id) {
        await Customer.update(
          {
            ...item
          },
          {
            where: {
              id: item.id
            }
          }
        )

        const customer = await Customer.findByPk(item.id)
        return customer
      } else {
        const data = await Customer.create({
          ...item
        })
        return data
      }
    })

    const resultCustomers = await Promise.all(updateCustomers)

    await Payment.update(
      {
        ...payment
      },
      {
        where: {
          id: payment.id
        }
      }
    )

    await Order.update(
      {
        is_confirmed,
        with_hotel,
        with_transport,
        has_insurance,
        price,
        agent_tip,
        payment_id: payment.id,
        user_id: user_id,
        customer_payments: JSON.stringify(customer_payments)
      },
      {
        where: {
          id: orderId
        }
      }
    )

    await Flight.destroy({
      where: {
        order_id: orderId
      }
    })

    const items = flights.map((item) => ({
      info: JSON.stringify(item.info),
      order_id: orderId,
      price: item.price,
      type: item.type
    }))

    await Flight.bulkCreate(items)

    const resultOrder = await Order.findByPk(orderId)

    await resultOrder.setCustomers(
      resultCustomers.map((item) => {
        return item.id
      })
    )

    res.status(201).json({
      message: 'Order updated successfully!'
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update order: ' + String(err)
    })
  }
}

exports.deleteOrder = (req, res, next) => {
  const orderId = req.params.order_id

  Order.findByPk(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found!' })
      }
      Payment.destroy({
        where: {
          id: order.payment_id
        }
      })
      return Order.destroy({
        where: {
          id: orderId
        }
      })
    })
    .then(() => {
      res.status(200).json({ message: 'Order deleted!' })
    })
    .catch((err) => console.log(err))
}
