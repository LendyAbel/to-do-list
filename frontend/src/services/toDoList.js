import axios from 'axios'

const baseUrl = 'http://localhost:3001/list'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async (user) => {
  const response = await axios.get(baseUrl)
  const list = response.data.filter((task) => task.user === user.id)
  return list
}

export const createNew = async (newObject) => {
  console.log('SERVICE POST token:', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const deleteById = async (deletedElement) => {
  const response = await axios.delete(`${baseUrl}/${deletedElement.id}`)
  return response.data
}

export const updateById = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
  )
  return response.data
}
