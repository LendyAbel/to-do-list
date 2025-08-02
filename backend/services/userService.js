const { getDB } = require('./helpService')
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], users: [] })

const findUserById = async userId => {
  const db = await getDB()
  const user = db.data.users.find(user => user.id === userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  return user
}

module.exports = { findUserById }
