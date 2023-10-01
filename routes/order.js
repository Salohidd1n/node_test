const controller = require('../controllers/order')
const router = require('express').Router()

router.post('/', controller.createOrder)
router.get('/:order_id', controller.getOrder)
router.put('/:order_id', controller.updateOrder)
router.delete('/:order_id', controller.deleteOrder)
router.put('/confirm/:order_id', controller.confirmOrder)
router.get('/', controller.getOrders)

module.exports = router
