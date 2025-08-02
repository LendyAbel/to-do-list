const { getDB } = require('./helpService')
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], users: [] })

const getAllUsers = async () => {
  const db = await getDB()
  return db.data.users
}

const findUserById = async userId => {
  const db = await getDB()
  const user = db.data.users.find(user => user.id === userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  return user
}

const writeUser = async user => {
  const db = await getDB()
  db.data.users.push(user)
  await db.write()

  return user
}

const updateUserById = async (id, updatedUser) => {
  const db = await getDB()
  db.data.users = db.data.users.map(user => (user.id === id ? updatedUser : user))
  await db.write()
  return updatedUser
}

const deleteUserById = async id => {
  const db = await getDB()
  const deletedUser = db.data.users.find(user => user.id === id)
  db.data.users = db.data.users.filter(user => user.id !== id)
  await db.write()
  return deletedUser
}

module.exports = { findUserById, getAllUsers, writeUser, updateUserById, deleteUserById }
