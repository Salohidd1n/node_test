const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./util/database')
const authMid = require('./middleware/auth')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

//test route
app.get('/', (req, res, next) => {
  res.send('Hello World10')
})

//AUTH routes
app.use('/auth', require('./routes/auth'))
app.use('/order', require('./routes/order'))
app.use('/customer', require('./routes/customer'))

//CRUD routes
app.use('/users', require('./routes/users'))
// app.use('/roles', authMid, require('./routes/roles'))

//error handling
app.use((error, req, res, next) => {
  console.log('err====>', error)
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({ message: message })
})

//sync database
sequelize
  .sync()
  .then((result) => {
    console.log('Database connected')

    app.listen(3000)
  })
  .catch((err) => console.log(err))
