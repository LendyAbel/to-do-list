const { getDB } = require('./helpService')
const { JSONFilePreset } = require('lowdb/node')
const path = require('path')

const dbPath = path.join(__dirname, '../db/db.json')
const listDB = JSONFilePreset(dbPath, { list: [], users: [] })

const getListByUser = async userId => {
  const db = await getDB()
  return db.data.list.filter(item => item.user === userId)
}

const writeElement = async element => {
  //Reading database
  const db = await getDB()
  db.data.list.push(element)
  await db.write()

  return element
}

const updateElementById = async (id, updatedElement) => {
  const db = await getDB()
  db.data.list = db.data.list.map(element => (element.id === id ? updatedElement : element))
  await db.write()
  return updatedElement
}

const deleteElementById = async id => {
  const db = await getDB()
  const deletedElement = db.data.list.find(element => element.id === id)
  db.data.list = db.data.list.filter(element => element.id !== id)
  await db.write()
  return deletedElement
}

module.exports = { getListByUser, writeElement, updateElementById, deleteElementById }
