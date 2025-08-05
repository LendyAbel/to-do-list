import AcceptButton from './Elements/AcceptButton'
import PasswordInput from './Elements/PasswordInput'
import TextInput from './Elements/TextInput'
import ErrorMenssage from './utils/ErrorMenssage'

const RegisterFormUI = ({
  error,
  setError,
  newUser,
  setNewUser,
  isLoading,
  setRegister,
  handleSubmit
}) => {
  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="mb-1 text-3xl font-bold text-[#607D8B]">
          Create Account
        </h2>
        <p className="text-sm text-[#9e9e9e]">Join us today and get started</p>
      </div>

      {/* Error Message */}
      {error && <ErrorMenssage error={error} />}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <TextInput
            name="username"
            label="Username"
            data={newUser}
            setData={setNewUser}
            value="username"
            clearError={() => {
              setError('')
            }}
          />
          <TextInput
            name="name"
            label="Full Name"
            data={newUser}
            setData={setNewUser}
            value="name"
            clearError={() => {
              setError('')
            }}
          />
          <PasswordInput
            name="password"
            label="Password"
            data={newUser}
            setData={setNewUser}
            value="password"
            clearError={() => {
              setError('')
            }}
          />
        </div>
        <AcceptButton
          label="Creat Account"
          loadingLabel="Creating Account..."
          type="submit"
          disable={
            !newUser.username || !newUser.name || !newUser.password || isLoading
          }
          isPending={isLoading}
          className="w-full"
        />
      </form>

      <div className="mt-2 text-center">
        <p className="text-sm text-[#9e9e9e]">
          Already have an account?
          <button
            onClick={() => setRegister(false)}
            className="ml-1 cursor-pointer font-medium text-[#AFB42B] transition-colors duration-200 hover:text-[#a2af2e] hover:underline"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  )
}

export default RegisterFormUI
