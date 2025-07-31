const express = require('express')
const cors = require('cors')

const listRouter = require('./controllers/list')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/list', listRouter)
app.use('/users', userRouter)
app.use('/login', loginRouter)

module.exports = app
