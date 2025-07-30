const listRouter = require('express').Router()
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const logger = require('../utils/logger')

const { generateId } = require('../utils/list_helper')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], user: [] })

listRouter.get('/', async (req, res) => {
  logger.info('Recived request to get list')

  const db = await listDB
  await db.read()

  if (!db.data.list) {
    return res
      .status(500)
      .json({ error: 'List not found' })
      .end(() => {
        logger.error('List not found')
      })
  }

  const { list } = db.data

  return res
    .status(200)
    .json(list)
    .end(() => {
      logger.info('List sent successfully')
    })
})

listRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  logger.info('Recived request to get element with id:', id)

  const db = await listDB
  await db.read()

  if (!db.data.list) {
    return res
      .status(500)
      .json({ error: 'List not found' })
      .end(() => {
        logger.error('List not found')
      })
  }

  const { list } = db.data
  const element = list.find(element => element.id === id)

  if (!element) {
    return res
      .status(404)
      .json({ error: 'Element not found' })
      .end(() => {
        logger.error('Element not found')
      })
  }

  return res
    .status(200)
    .json(element)
    .end(() => {
      logger.info('Element sent successfully')
    })
})

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

  const newElement = {
    title,
    description,
    checked: false,
    id: generateId(),
  }

  const db = await listDB
  await db.read()

  db.data.list.push(newElement)
  await db.write()

  return res
    .status(201)
    .json(newElement)
    .end(() => {
      logger.info('Item added successfully:', newElement)
    })
})

listRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedElement = req.body
  logger.info('Recived request to update item with id:', id)

  const db = await listDB
  await db.read()

  db.data.list = db.data.list.map(element => (element.id === id ? updatedElement : element))
  await db.write()

  res
    .status(200)
    .json(updatedElement)
    .end(() => {
      logger.info('Item updated successfully:', updatedElement)
    })
})

listRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  logger.info('Recived request to delete item with id:', id)

  const db = await listDB
  await db.read()
  
  db.data.list = db.data.list.filter(element => element.id !== id)
  await db.write()

  res.status(204).end(() => {
    logger.info(`Item with id ${id} deleted successfully`)
  })
})

module.exports = listRouter
