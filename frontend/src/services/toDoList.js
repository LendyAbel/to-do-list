import axios from 'axios'

const baseUrl = 'http://localhost:3001/list'

let token = null
let config = {}

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = { headers: { Authorization: token } }
}

export const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

export const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const deleteById = async (deletedElement) => {
  const response = await axios.delete(`${baseUrl}/${deletedElement.id}`, config)
  return response.data
}

export const updateById = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config,
  )
  return response.data
}
