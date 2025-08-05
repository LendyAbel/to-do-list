import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../Context/UserContext'
import { creatNewUser } from '../services/users'
import { setToken } from '../services/toDoList'
import { login } from '../services/login'

export const useRegisterForm = () => {
  const [newUser, setNewUser] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const creatinAndLogin = async (user) => {
    const userCreated = await creatNewUser(user)
    const { username, password } = newUser
    let retries = 5
    let loginUser = null
    while (retries > 0) {
      try {
        loginUser = await login({ username, password })
        break // success, break bucle
      } catch (e) {
        retries--
        setTimeout(500) // wait half second
      }
    }
    return { userCreated, loginUser }
  }

  const setUserToken = (loginUser) => {
    window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(loginUser))
    setUser(loginUser)
    setToken(loginUser.token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear previous errors
    setIsLoading(true)
    try {
      const { userCreated, loginUser } = await creatinAndLogin(newUser)
      setUserToken(loginUser)
      navigate('/toDoList')
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Username already exists. Please choose a different username.')
      } else if (err.response?.status === 400) {
        setError('Invalid user data. Please check your information.')
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.')
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your connection.')
      } else {
        setError(
          err.response?.data?.error ||
            err.message ||
            'Registration failed. Please try again.',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { newUser, setNewUser, error, setError, handleSubmit, isLoading }
}
