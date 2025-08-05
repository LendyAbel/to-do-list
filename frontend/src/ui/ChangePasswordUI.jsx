import { motion } from 'framer-motion'
import Header from './Elements/Header'
import ErrorMenssage from './utils/ErrorMenssage'
import PasswordInput from './Elements/PasswordInput'
import AcceptButton from './Elements/AcceptButton'
import CancelButton from './Elements/CancelButton'

const ChangePasswordUI = ({
    formData,
    setFormData,
    handleSubmit,
    handleCancel,
    error,
    validationError,
    isFormValid,
    clearErrors,
    isLoading
}) => {
  const screenVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  }

  return (
    <motion.div
      key="change-password-form"
      {...screenVariants}
      className="p-4 sm:p-6"
    >
      <Header
        title="Change Password"
        description="Update your account password"
      />

      {(error || validationError) && (
        <ErrorMenssage error={error || validationError} />
      )}

      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          {/* New Password */}
          <PasswordInput
            label="New Password"
            name="newPassword"
            data={formData}
            setData={setFormData}
            value="newPassword"
            clearError={clearErrors}
          />

          {/* Confirm New Password */}
          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            data={formData}
            setData={setFormData}
            value="confirmPassword"
            clearError={clearErrors}
          />
        </div>

        {/* Password Requirements */}
        <div className="mt-3 rounded-xl bg-[#F0F4C3]/20 p-3">
          <p className="mb-1 text-xs font-medium text-[#607D8B]">
            Password Requirements:
          </p>
          <ul className="space-y-1 text-xs text-[#9e9e9e]">
            <li>• At least 6 characters long</li>
            <li>• Both new password fields must match</li>
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <AcceptButton
            label="Change Password"
            loadingLabel="Changing..."
            type="submit"
            disable={!isFormValid || isLoading}
            isPending={isLoading}
          />
          <CancelButton label="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </motion.div>
  )
}

export default ChangePasswordUI
