import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

export const login = async (credential) => {
 const response = await axios.post(baseUrl, credential)  
 return response.data  
}