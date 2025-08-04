import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

let token = null
let config = {}

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = { headers: { Authorization: token } }
}

export const creatNewUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export const changePassword = async (userToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${userToUpdate.id}`,
    userToUpdate,
    config,
  )
  return response.data
}
