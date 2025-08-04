// *** AUTHENTIFICATION DOING ON MIDDLEWARE

const listRouter = require('express').Router()
const listService = require('../services/listService')
const userService = require('../services/userService')

const logger = require('../utils/logger')

const { generateId } = require('../utils/list_helper')

listRouter.get('/', async (req, res) => {
  logger.info('Recived request to get list')

  const userId = req.user.id

  const userList = await listService.getListByUser(userId)

  logger.info('List sent successfully for user:', userList)
  return res.status(200).json(userList)
})

// listRouter.get('/:id', async (req, res) => {
//   const id = req.params.id
//   logger.info('Recived request to get element with id:', id)

// Put code here
// -------------
//
//--------------

//   logger.info('Element sent successfully')
//   return res.status(200).json(element)
// })

listRouter.post('/', async (req, res) => {
  logger.info('Recived request to add item:', req.body)

  const { title, description } = req.body
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: 'Title and description are required' })
      .end(() => {
        logger.error('Title and description are required')
      })
  }

  const userId = req.user.id
  const user = await userService.findUserById(userId)

  const newElement = {
    title,
    description,
    checked: false,
    id: generateId(),
    user: user.id,
  }

  const elementAdded = await listService.writeElement(newElement)

  logger.info('Item added successfully:', elementAdded)
  return res.status(201).json(elementAdded)
})

listRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  logger.info('Recived request to update item with id:', id)
  const elementToUpdate = req.body

  const updatedElement = await listService.updateElementById(id, elementToUpdate)

  logger.info('Item updated successfully:', updatedElement)
  res.status(200).json(updatedElement)
})

listRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  logger.info('Recived request to delete item with id:', id)

  const deletedElement = await listService.deleteElementById(id)

  logger.info(`Item deleted successfully: `, deletedElement)
  res.status(204).send(deletedElement)
})

module.exports = listRouter
