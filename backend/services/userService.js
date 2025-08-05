const { getDB } = require('./helpService')

const getAllUsers = async () => {
  const db = await getDB()
  return db.data.users
}

const findUserById = async userId => {
  const db = await getDB()
  const user = db.data.users.find(user => user.id === userId)
  
  return user || null
}

const findUserByUsername = async username => {
  const db = await getDB()
  const user = db.data.users.find(user => user.username === username)
  
  return user || null
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

module.exports = { findUserById, findUserByUsername, getAllUsers, writeUser, updateUserById, deleteUserById }
