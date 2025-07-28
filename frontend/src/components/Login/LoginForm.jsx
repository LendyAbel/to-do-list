import { useNavigate } from 'react-router'

const LoginForm = () => {
  let navigate = useNavigate()
  return (
    <form className="my-5 flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <div className="flex gap-2 justify-between w-full">
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" />
        </div>
        <div className="flex gap-2 justify-between w-full">
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" />
        </div>
      </div>
      <button
        onClick={() => {
          navigate('/toDoList')
        }}
        className="h-10 w-20 bg-amber-400"
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
