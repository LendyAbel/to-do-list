const express = require('express')
const path = require('path')
const fs = require('fs')

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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

module.exports = app
