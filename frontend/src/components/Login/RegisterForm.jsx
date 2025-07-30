import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { creatNewUser } from '../../services/users'

const RegisterForm = () => {
  const [newUser, setNewUser] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const userCreated = await creatNewUser(newUser)
    console.log('New user created:', userCreated)
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
            onChange={(e) => {
              setNewUser({ ...newUser, username: e.target.value })
            }}
            required
          />
        </div>
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="name"
            onChange={(e) => {
              setNewUser({...newUser, name:e.target.value})
            }}
            required
          />
        </div>
        <div className="relative flex w-full items-center justify-between gap-2">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              setNewUser({...newUser, password: e.target.value})
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
        Register
      </button>
    </form>
  )
}

export default RegisterForm
