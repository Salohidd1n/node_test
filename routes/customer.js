const controller = require('../controllers/customer')
const router = require('express').Router()

router.get('/search', controller.getCustomerByPassportNumber)

module.exports = router
