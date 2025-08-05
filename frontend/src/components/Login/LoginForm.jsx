import LoginFormUI from '../../ui/LoginFormUI'
import { useLoginForm } from '../../hooks/useLoginForm'

const LoginForm = ({ setRegister }) => {
  const {
    userInputData,
    setUserInputData,
    handleSubmit,
    isLoading,
    error,
    setError,
  } = useLoginForm()

  return (
    <LoginFormUI
      userInputData={userInputData}
      setUserInputData={setUserInputData}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      setError={setError}
      setRegister={setRegister}
    />
  )
}

export default LoginForm
