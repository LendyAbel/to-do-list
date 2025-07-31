import { useState } from 'react'
import { LoginForm, RegisterForm } from '../'

const Login = () => {
  const [register, setRegister] = useState(false)

  return (
    <div className="h-auto flex items-center justify-center p-1">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        {!register ? (
          <LoginForm setRegister={setRegister} />
        ) : (
          <RegisterForm setRegister={setRegister} />
        )}
      </div>
    </div>
  )
}

export default Login
