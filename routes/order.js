const controller = require('../controllers/order')
const router = require('express').Router()

// CRUD Routes /users

router.post('/', controller.createOrder) // /users
router.get('/:order_id', controller.getOrder) // /users
router.put('/:order_id', controller.updateOrder) // /users
router.delete('/:order_id', controller.deleteOrder) // /users

module.exports = router
