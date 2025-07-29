const listRouter = require('express').Router()
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const { generateId } = require('../utils/list_helper')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [] })

listRouter.post('/', async (req, res) => {
  console.log('Recived request to add item:', req.body)

  const { title, description } = req.body

  const newElement = {
    title,
    description,
    checked: false,
    id: generateId(),
  }
  const db = await listDB
  await db.update(({ list }) => list.push(newElement))
  res.status(201).json(newElement)
})

module.exports = listRouter
