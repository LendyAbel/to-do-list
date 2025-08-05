const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const logger = require('../utils/logger')

const dbPath = path.join(__dirname, '../db/db.json')

const getDB = async () => {
  const listDB = JSONFilePreset(dbPath, { list: [], users: [] })
  const db = await listDB
  await db.read()
  if (!db.data.list) {
    return logger.error('List not found')
  }
  return db
}

module.exports = { getDB }
