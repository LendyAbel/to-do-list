const express = require('express')


const listRouter = require('./controllers/list')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const { authMiddleware } = require('./middleware/auth')

const app = express()


app.use(express.static('dist'))

app.use(express.json())

app.use('/api/list', authMiddleware, listRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
