import { useNavigate } from 'react-router'
import { useState, useContext } from 'react'
import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa'
import { creatNewUser } from '../../services/users'
import { UserContext } from '../../useContext/UserContext'
import { setToken } from '../../services/toDoList'
import { login } from '../../services/login'

const RegisterForm = ({ setRegister }) => {
  const [newUser, setNewUser] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const[error, setError] = useState('')
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
      {error && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <FaExclamationTriangle
            className="flex-shrink-0 text-red-500"
            size={20}
          />
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              onChange={(e) => {
                setNewUser({ ...newUser, username: e.target.value })
              }}
              required
              disabled={isLoading}
              className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
              placeholder="Choose a username"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Full Name
            </label>
            <input
              name="name"
              type="text"
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value })
              }}
              required
              disabled={isLoading}
              className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setNewUser({ ...newUser, password: e.target.value })
                }}
                required
                disabled={isLoading}
                className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 pr-12 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
                placeholder="Create a secure password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-[#9e9e9e] transition-colors duration-200 hover:text-[#607D8B] focus:text-[#607D8B] focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowPassword(!showPassword)
                }}
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full transform rounded-xl bg-[#CDDC39] px-6 py-3 text-lg font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={
            !newUser.username || !newUser.name || !newUser.password || isLoading
          }
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
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
