import { useState } from 'react'
import { LoginForm, RegisterForm } from '../'
import { div } from 'motion/react-client'

const Login = () => {
  const [optionSelected, setOptionSelected] = useState('login')

  return (
    <div className="bg-primary-bg flex max-h-[80vh] w-[96%] max-w-3xl flex-col items-center justify-center rounded-lg p-3 shadow-lg">
      {optionSelected === 'login' && <LoginForm />}
      {optionSelected === 'register' && <RegisterForm />}
      <div className="flex items-center justify-center gap-3">
        <button
          className="cursor-pointer border p-1"
          onClick={() => setOptionSelected('login')}
        >
          Login
        </button>
        <button
          className="cursor-pointer border p-1"
          onClick={() => setOptionSelected('register')}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Login
