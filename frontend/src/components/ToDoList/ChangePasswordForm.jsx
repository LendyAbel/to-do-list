import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa'
import { changePassword } from '../../services/users'
import Header from '../../ui/Elements/Header'
import ErrorMenssage from '../../ui/utils/ErrorMenssage'
import PasswordInput from '../../ui/Elements/PasswordInput'

// Animation for transitioning between screens
const screenVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 },
}

const ChangePasswordForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  })
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('New passwords do not match.')
      return false
    }
    if (formData.newPassword.length < 6) {
      setValidationError('New password must be at least 6 characters long.')
      return false
    }
    setValidationError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!validatePasswords()) {
        return
      }
      const user = JSON.parse(window.localStorage.getItem('loggedBlogsappUser'))
      const userToUpdate = { ...user, newPassword: formData.newPassword }
      const updatedUser = await changePassword(userToUpdate)

      handleClose()
    } catch (error) {
      if (error.response?.status === 400) {
        setError('Invalid password data. Please check your information.')
      } else if (error.response?.status === 401) {
        setError('Current password is incorrect.')
      } else if (error.response?.status === 403) {
        setError('You are not authorized to change this password.')
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.')
      } else if (error.message === 'Network Error') {
        setError('Network error. Please check your connection.')
      } else {
        setError(
          error.response?.data?.error ||
            error.message ||
            'Failed to change password. Please try again.',
        )
      }
    }
  }

  const handleCancel = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setError('')
    setValidationError('')
    handleClose()
  }

  const clearErrors = () => {
    if (error) setError('')
    if (validationError) setValidationError('')
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const hasError = error || validationError
  const isFormValid =
    formData.newPassword.trim() && formData.confirmPassword.trim()

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

      {hasError && <ErrorMenssage error={error || validationError} />}

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
          <button
            type="submit"
            disabled={!isFormValid}
            className="flex-1 transform rounded-xl bg-[#CDDC39] px-6 py-3 text-lg font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Change Password
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 transform rounded-xl bg-[#607D8B] px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4c616b] hover:shadow-xl focus:ring-4 focus:ring-[#607D8B]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default ChangePasswordForm
