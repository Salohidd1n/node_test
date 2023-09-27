const { role: Role } = require('../models')

// CRUD Controllers

//get all users
exports.getRoles = (req, res, next) => {
  Role.findAll()
    .then((roles) => {
      res.status(200).json({ roles: roles })
    })
    .catch((err) => console.log(err))
}
