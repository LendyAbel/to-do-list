const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const logger = require('../utils/logger')

const { generateId } = require('../utils/list_helper')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], users: [] })

userRouter.get('/', async (req, res) => {
  logger.info('Recived request to get user')

  const db = await listDB
  await db.read()

  if (!db.data.users) {
    return res
      .status(500)
      .json({ error: 'Users not found' })
      .end(() => {
        logger.error('Users not found')
      })
  }
  console.log('db.data.users------', db.data.users)
  
  const usersToShow = db.data.users.map(({passwordHash,...resto})=> resto) //Deleting hashpassword for security

  return res
    .status(200)
    .json(usersToShow)
    .end(() => {
      logger.info('Users sent successfully')
    })
})

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
    id: generateId(),
  }

  const db = await listDB
  await db.read()

  db.data.users.push(newUser)
  await db.write()

  return res
    .status(201)
    .json(newUser)
    .end(() => {
      logger.info('User added successfully:', newUser)
    })
})

userRouter.put('/:id', async (req, res) => {
  logger.info('Recived request to update item with id:', id)
  const id = req.params.id
  const { username, password, name } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const updatedUser = { username, name, passwordHash, id }

  const db = await listDB
  await db.read()

  db.data.users = db.data.users.map(user => (user.id === id ? updatedUser : user))
  await db.write()

  res
    .status(200)
    .json(updatedUser)
    .end(() => {
      logger.info('User updated successfully:', updatedUser)
    })
})

userRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  console.log()
  logger.info('Recived request to delete item with id:', id)

  const db = await listDB
  await db.read()

  db.data.users = db.data.users.filter(user => user.id !== id)
  await db.write()

  res.status(204).end(() => {
    logger.info(`User with id ${id} deleted successfully`)
  })
})

module.exports = userRouter
