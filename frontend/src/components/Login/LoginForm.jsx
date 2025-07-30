import { useNavigate } from 'react-router'
import { login } from '../../services/login'
import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { getAllUsers } from '../../services/users'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
          />
        </div>
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="h-10 w-20 bg-amber-400">
        Login
      </button>
    </form>
  )
}

export default LoginForm
