const express = require('express')
const cors = require('cors')

const listRouter = require('./controllers/list')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/list', listRouter)

module.exports = app
