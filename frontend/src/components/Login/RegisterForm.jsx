import { useNavigate } from 'react-router'
import { useState, useContext } from 'react'
import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa'
import { creatNewUser } from '../../services/users'
import { UserContext } from '../../useContext/UserContext'
import { setToken } from '../../services/toDoList'
import { login } from '../../services/login'
import ErrorMenssage from '../../ui/utils/ErrorMenssage'
import TextInput from '../../ui/Elements/TextInput'
import PasswordInput from '../../ui/Elements/PasswordInput'
import AcceptButton from '../../ui/Elements/AcceptButton'

const RegisterForm = ({ setRegister }) => {
  const [newUser, setNewUser] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear previous errors
    setIsLoading(true)
    try {
      //Creating user in database
      const userCreated = await creatNewUser(newUser)
      console.log('user created')

      //Login with the created user
      console.log('Login')
      const { username, password } = newUser
      //Retry cause maybe user creation get late
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

      //Set user and token
      window.localStorage.setItem(
        'loggedBlogsappUser',
        JSON.stringify(loginUser),
      )
      setUser(loginUser)
      setToken(loginUser.token)

      navigate('/toDoList')
      console.log('New user created:', userCreated)
      console.log('Login')
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

  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="mb-1 text-3xl font-bold text-[#607D8B]">
          Create Account
        </h2>
        <p className="text-sm text-[#9e9e9e]">Join us today and get started</p>
      </div>

      {/* Error Message */}
      {error && <ErrorMenssage error={error} />}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <TextInput
            name="username"
            label="Username"
            data={newUser}
            setData={setNewUser}
            value="username"
            clearError={() => {
              setError('')
            }}
          />
          <TextInput
            name="name"
            label="Full Name"
            data={newUser}
            setData={setNewUser}
            value="name"
            clearError={() => {
              setError('')
            }}
          />
          <PasswordInput
            name="password"
            label="Password"
            data={newUser}
            setData={setNewUser}
            value="password"
            clearError={() => {
              setError('')
            }}
          />
        </div>
        <AcceptButton
          label="Creat Account"
          loadingLabel="Creating Account..."
          type="submit"
          disable={
            !newUser.username || !newUser.name || !newUser.password || isLoading
          }
          isPending={isLoading}
          className="w-full"
        />
      </form>

      <div className="mt-2 text-center">
        <p className="text-sm text-[#9e9e9e]">
          Already have an account?
          <button
            onClick={() => setRegister(false)}
            className="ml-1 cursor-pointer font-medium text-[#AFB42B] transition-colors duration-200 hover:text-[#a2af2e] hover:underline"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  )
}

export default RegisterForm
