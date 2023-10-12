const { orders: Order } = require('../models')

exports.createOrder = async (req, res, next) => {
  const {
    is_confirmed,
    with_hotel,
    with_transport,
    has_insurance,
    price,
    agent_tip
  } = req.body

  try {
    const order = await Order.create({
      is_confirmed,
      with_hotel,
      with_transport,
      has_insurance,
      price,
      agent_tip
    })

    res.status(201).json({
      message: 'Order created successfully!',
      order
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

    const orders = await Order.findAndCountAll({
      offset: page,
      limit: limit,
      order: [['createdAt', 'DESC']]
    })

    res.status(201).json({
      message: 'Success',
      orders
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create order: ' + String(err)
    })
  }
}

exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.order_id

    const order = await Order.findOne({
      where: {
        id: orderId
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

exports.updateOrder = async (req, res, next) => {
  const {
    is_confirmed,
    with_hotel,
    with_transport,
    has_insurance,
    price,
    agent_tip
  } = req.body
  try {
    const orderId = req.params.order_id

    await Order.update(
      {
        is_confirmed,
        with_hotel,
        with_transport,
        has_insurance,
        price,
        agent_tip
      },
      {
        where: {
          id: orderId
        }
      }
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
