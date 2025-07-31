const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const logger = require('../utils/logger')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], users: [] })

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const db = await listDB
  db.read()

  const user = db.data.users.find(user => user.username === username)
  if (!user) {
    return res.status(401).json({
      error: 'invalid username',
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, 'secret')
  const userWithToken = { token, username: user.username, name: user.name, id: user.id }

  return res.status(200).send(userWithToken)
})

module.exports = loginRouter
