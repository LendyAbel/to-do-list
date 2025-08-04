import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const creatNewUser = async (newUser) => {
  const response = await axios.post(baseUrl,newUser)
  return response.data
}
