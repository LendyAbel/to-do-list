import RegisterFormUI from '../../ui/RegisterFormUI'
import { useRegisterForm } from '../../hooks/useRegisterForm'

const RegisterForm = ({ setRegister }) => {
  const { newUser, setNewUser, error, setError, handleSubmit, isLoading } =
    useRegisterForm()

  return (
    <RegisterFormUI
      error={error}
      setError={setError}
      newUser={newUser}
      setNewUser={setNewUser}
      isLoading={isLoading}
      setRegister={setRegister}
      handleSubmit={handleSubmit}
    />
  )
}

export default RegisterForm
