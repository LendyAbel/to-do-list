import { useNavigate } from 'react-router'
import { login } from '../../services/login'
import { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa'
import { UserContext } from '../../useContext/UserContext'
import { setToken } from '../../services/toDoList'

const LoginForm = ({ setRegister }) => {
  const [userInputData, setUserInputData] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear previous errors
    setIsLoading(true)
    try {
      //Login with credentials
      const credentials = {
        username: userInputData.username,
        password: userInputData.password,
      }
      const loginUser = await login(credentials)

      //Set user and token
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

  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="mb-2 text-3xl font-bold text-[#607D8B]">Welcome Back</h2>
        <p className="text-sm text-[#9e9e9e]">Please sign in to your account</p>
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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
              onChange={(e) =>
                setUserInputData({ ...userInputData, username: e.target.value })
              }
              required
              disabled={isLoading}
              className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
              placeholder="Enter your username"
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
                  setUserInputData({
                    ...userInputData,
                    password: e.target.value,
                  })
                }}
                required
                disabled={isLoading}
                className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 pr-12 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
                placeholder="Enter your password"
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
            !userInputData.username || !userInputData.password || isLoading
          }
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-2 text-center">
        <p className="text-sm text-[#9e9e9e]">
          Don't have an account?
          <button
            onClick={() => setRegister(true)}
            className="ml-1 cursor-pointer font-medium text-[#AFB42B] transition-colors duration-200 hover:text-[#a2af2e] hover:underline"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  )
}

export default LoginForm
