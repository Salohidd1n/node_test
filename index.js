const express = require('express')
const bodyparser = require('body-parser')
const models = require('./models')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

//test route
app.get('/', (req, res, next) => {
  res.send('Hello World')
})

app.use('/order', require('./routes/order'))
// app.use('/roles', authMid, require('./routes/roles'))

//error handling
app.use((error, req, res, next) => {
  console.log('err====>', error)
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({ message: message })
})

//sync database
models.sequelize
  .sync()
  .then((result) => {
    console.log('Database connected')

    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  })
