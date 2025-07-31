import { useNavigate } from 'react-router'
import { login } from '../../services/login'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const credentials = { username, password }

    const user = await login(credentials)
    window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))

    navigate('/toDoList')
    console.log('Submit')
  }

  return (
    <form
      className="my-5 flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="relative flex w-full items-center justify-between gap-2">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
          />
          <div
            className="absolute right-1 hover:bg-black/20"
            onClick={(e) => {
              e.stopPropagation
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
      <button type="submit" className="h-10 w-20 bg-amber-400">
        Login
      </button>
    </form>
  )
}

export default LoginForm
