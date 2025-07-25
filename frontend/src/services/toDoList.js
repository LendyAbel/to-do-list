import axios from "axios";

const baseUrl = 'http://localhost:3001/posts'

export const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}