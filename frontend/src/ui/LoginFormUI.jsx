import ErrorMenssage from './utils/ErrorMenssage'
import TextInput from './Elements/TextInput'
import PasswordInput from './Elements/PasswordInput'
import AcceptButton from './Elements/AcceptButton'

const LoginFormUI = ({
  error,
  setError,
  handleSubmit,
  isLoading,
  userInputData,
  setUserInputData,
  setRegister,
}) => {
  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="mb-2 text-3xl font-bold text-[#607D8B]">Welcome</h2>
        <p className="text-sm text-[#9e9e9e]">Please sign in to your account</p>
      </div>

      {/* Error Message */}
      {error && <ErrorMenssage error={error} />}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <TextInput
            label="Username"
            name="username"
            value={'username'}
            data={userInputData}
            setData={setUserInputData}
            clearError={() => {
              setError('')
            }}
          />
          <PasswordInput
            label="Password"
            name="password"
            data={userInputData}
            setData={setUserInputData}
            value="password"
            clearError={() => {
              setError('')
            }}
          />
        </div>

        <AcceptButton
          label="Sign In"
          loadingLabel="Signing In..."
          type="submit"
          className="w-full"
          disable={
            !userInputData.username || !userInputData.password || isLoading
          }
          isPending={isLoading}
        />
      </form>
      <div className="mt-2 text-center">
        <p className="text-sm text-[#9e9e9e]">
          Don't have an account?
          <button
            onClick={() => setRegister(true)}
            className="ml-1 cursor-pointer font-medium text-[#AFB42B] transition-colors duration-200 hover:text-[#a2af2e] hover:underline"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  )
}

export default LoginFormUI
