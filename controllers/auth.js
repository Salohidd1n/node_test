const { user: User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // check user for existance
    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (!user) res.status(404).json({ message: 'User not found' })

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (isValidPassword) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h'
        }
      )

      // user
      res.status(200).json({ ...user.dataValues, token })
    }
  } catch (err) {
    console.log(err)
  }
  res.status(500).json({ message: 'Invalid Credentials' })
}
