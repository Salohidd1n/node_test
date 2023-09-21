const Customer = require('../models/customer')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getCustomerByPassportNumber = (req, res, next) => {
  const search = req.query.search
  Customer.findAll({
    where: {
      passport_number: {
        [Op.like]: `%${search}%`
      }
    }
  })
    .then((customers) => {
      res.status(200).json({ customers })
    })
    .catch((err) => res.status(404).json({ message: 'Not found' }))
}
