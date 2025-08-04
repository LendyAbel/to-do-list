const userRouter = require('express').Router()
const userService = require('../services/userService')
const bcrypt = require('bcrypt')

const logger = require('../utils/logger')

const { generateId } = require('../utils/list_helper')

userRouter.get('/', async (req, res) => {
  logger.info('Recived request to get user')

  const users = await userService.getAllUsers()

  // Deleting hashpassword for security
  const usersToShow = users.map(({ passwordHash, ...resto }) => resto)

  logger.info('Users sent successfully')
  return res.status(200).json(usersToShow)
})

userRouter.post('/', async (req, res) => {
  logger.info('Recived request to add usser:', req.body)

  const { username, password, name } = req.body
  if (!username || !password) {
    logger.error('username and password are required')
    return res.status(400).json({ error: 'username and password are required' })
  }
  const users = await userService.getAllUsers()
  const user = users.find(user => user.username === username)
  if (user) {
    logger.error('username already exist')
    return res.status(409).json({ error: 'username already exist' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    username,
    name,
    passwordHash,
    id: generateId(),
  }

  const userAdded = await userService.writeUser(newUser)

  logger.info('User added successfully:', userAdded)
  res.status(201).json(userAdded)
})

userRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  logger.info('Recived request to update item with id:', id)
  const { username, newPassword, name } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  const userToUpdate = { username, name, passwordHash, id }

  const updatedUser = await userService.updateUserById(id, userToUpdate)

  logger.info('User updated successfully:', updatedUser)
  res.status(200).json(updatedUser)
})

userRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  logger.info('Recived request to delete item with id:', id)

  const deletedUser = await userService.deleteUserById(id)

  logger.info(`User deleted successfully: `, deletedUser)
  res.status(204).send(deletedUser)
})

module.exports = userRouter
