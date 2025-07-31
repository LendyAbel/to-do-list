import axios from 'axios'

const baseUrl = 'http://localhost:3001/list'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
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
