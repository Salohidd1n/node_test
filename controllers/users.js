const { users: User, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const Op = Sequelize.Op
// CRUD Controllers

//get all users
exports.getUsers = (req, res, next) => {
  const page = req.query.page || 0
  const limit = req.query.limit || 10
  User.findAndCountAll({
    offset: page,
    limit: limit
  })
    .then((users) => {
      res.status(200).json({ users: users })
    })
    .catch((err) => console.log(err))
}

//get user by id
exports.getUser = (req, res, next) => {
  const userId = req.params.userId

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }
      res.status(200).json({ user: user })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ message: 'User not created' })
    })
}

exports.getUserByName = (req, res, next) => {
  const search = req.query.search

  User.findAll({
    where: {
      first_name: {
        [Op.like]: `%${search}%`
      }
    }
  })
    .then((users) => {
      res.status(200).json({ users })
    })
    .catch((err) => res.status(404).json({ message: 'Not found' }))
}

//create user
exports.createUser = async (req, res, next) => {
  const {
    first_name,
    second_name,
    last_name,
    email,
    phone_number,
    thumb,
    role,
    password
  } = req.body

  const hashedPwd = await bcrypt.hash(password, 10)
  console.log('User======>')
  User.create({
    first_name: first_name,
    second_name: second_name,
    last_name: last_name,
    email: email,
    phone_number: phone_number,
    thumb: thumb,
    role: role,
    password: hashedPwd,
    created_at: new Date(),
    updated_at: new Date()
  })
    .then((result) => {
      console.log('Created User')
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'Failed to create user: ' + String(err)
      })
    })
}

//update user
exports.updateUser = (req, res, next) => {
  const {
    first_name,
    second_name,
    last_name,
    email,
    phone_number,
    thumb,
    role,
    new_password
  } = req.body
  const userId = req.params.userId
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }
      if (new_password) user.password = bcrypt.hashSync(new_password, 10)
      if (first_name) user.first_name = first_name
      if (last_name) user.last_name = last_name
      if (second_name) user.second_name = second_name
      if (email) user.email = email
      if (phone_number) user.phone_number = phone_number
      if (thumb) user.thumb = thumb
      if (role) user.role = role

      return user.save()
    })
    .then((result) => {
      res.status(200).json({ message: 'User updated!', user: result })
    })
    .catch((err) => console.log(err))
}

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }
      return User.destroy({
        where: {
          id: userId
        }
      })
    })
    .then((result) => {
      res.status(200).json({ message: 'User deleted!' })
    })
    .catch((err) => console.log(err))
}
