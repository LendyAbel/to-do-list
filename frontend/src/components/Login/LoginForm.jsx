import { useNavigate } from 'react-router'
import { login } from '../../services/login'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginForm = ({ setRegister }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = { username, password }
    const user = await login(credentials)
    window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
    navigate('/toDoList')
    console.log('Submit')
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-[#607D8B]">Welcome Back</h2>
        <p className="text-sm text-[#9e9e9e]">Please sign in to your account</p>
      </div>
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
              onChange={(e) => setUsername(e.target.value)}
              required
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
                  setPassword(e.target.value)
                }}
                required
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
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full transform rounded-xl bg-[#CDDC39] px-6 py-3 text-lg font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!username || !password}
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-[#9e9e9e]">
          Don't have an account?
          <button
            onClick={() => setRegister(true)}
            className="ml-1 cursor-pointer font-medium text-[#AFB42B] transition-colors duration-200 hover:text-[#a2af2e] hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  )
}

export default LoginForm
