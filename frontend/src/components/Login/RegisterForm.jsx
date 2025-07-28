import { useState } from 'react'
import { register } from '../../services/login'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { accessToken, user } = await register({ email, password });
    // localStorage.setItem('token', accessToken);   // optional
    alert(`Welcome, ${user.email}!`);
  } catch (err) {
    // Axios puts details under err.response
    const msg =
      err.response?.data?.message ||
      err.message ||
      'Registration failed';
    alert(msg);
  }
};

  return (
    <form
      className="my-5 flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className="flex w-full justify-between gap-2">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
      </div>
      <button type="submit" className="h-10 w-20 bg-amber-400">
        Register
      </button>
    </form>
  )
}

export default RegisterForm
