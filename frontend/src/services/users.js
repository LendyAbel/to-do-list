import axios from 'axios'

const baseUrl = 'http://localhost:3001/users'

export const getAllUsers = async () => {
    const response =await axios.get(baseUrl)
    return response.data
}