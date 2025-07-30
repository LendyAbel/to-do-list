import axios from 'axios'

const baseUrl = 'http://localhost:3001/users'

export const creatNewUser = async (newUser) => {
    const response =await axios.post(newUser)
    return response.data
}