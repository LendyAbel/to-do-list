const loginRouter = require('express').Router()
const userService = require('../services/userService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const logger = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  logger.info('Login request with username: ', username, ' and password: ', password)

  const user = await userService.findUserByUsername(username)
  console.log('USER', user)

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

  logger.info('Login correct:', userWithToken)
  return res.status(200).send(userWithToken)
})

module.exports = loginRouter
