const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const logger = require('../utils/logger')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], users: [] })

const getDB = async () => {
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
  return db
}

module.exports = { getDB }
