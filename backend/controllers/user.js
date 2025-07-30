const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const logger = require('../utils/logger')

const { generateId } = require('../utils/list_helper')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], user: [] })

userRouter.post('/', async (req, res) => {
  logger.info('Recived request to add usser:', req.body)

  const { username, password, name } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'username and password are required' })
      .end(() => {
        logger.error('username and password are required')
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    username,
    name,
    passwordHash,
    id: generateId()
  }

  const db = await listDB
  await db.read()

  db.data.user.push(newUser)
  await db.write()

  return res
    .status(201)
    .json(newUser)
    .end(() => {
      logger.info('User added successfully:', newUser)
    })
})

module.exports = userRouter
