import { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { login } from '../services/login'
import { setToken } from '../services/toDoList'
import { useNavigate } from 'react-router'

export const useLoginForm = () => {
  const [userInputData, setUserInputData] = useState({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const credentials = {
        username: userInputData.username,
        password: userInputData.password,
      }
      const loginUser = await login(credentials)

      window.localStorage.setItem(
        'loggedBlogsappUser',
        JSON.stringify(loginUser),
      )
      setUser(loginUser)
      setToken(loginUser.token)

      navigate('/toDoList')
      console.log('Login')
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('ERROR:', error.response.data.error)
        setError(`${error.response.data.error}, please try again.`)
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.')
      } else if (error.message === 'Network Error') {
        setError('Network error. Please check your connection.')
      } else {
        setError(
          error.response?.data?.error ||
            error.message ||
            'Login failed. Please try again.',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userInputData,
    setUserInputData,
    handleSubmit,
    isLoading,
    error,
    setError,
  }
}
