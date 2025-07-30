const express = require('express')
const cors = require('cors')

const listRouter = require('./controllers/list')
const userRouter = require('./controllers/user')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/list', listRouter)
app.use('/users', userRouter)

module.exports = app
