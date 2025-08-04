import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa'
// import { changePassword } from "../../services/users" // You'll need to create this service

// Animation for transitioning between screens
const screenVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 },
}

const ChangePasswordForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  //   const changePasswordMutation = useMutation({
  //     mutationFn: changePassword,
  //     onSuccess: () => {
  //       // Show success message or handle success
  //       handleClose()
  //     },
  //     onError: (err) => {
  //       // Handle different types of errors
  //       if (err.response?.status === 400) {
  //         setError("Invalid password data. Please check your information.")
  //       } else if (err.response?.status === 401) {
  //         setError("Current password is incorrect.")
  //       } else if (err.response?.status === 403) {
  //         setError("You are not authorized to change this password.")
  //       } else if (err.response?.status === 500) {
  //         setError("Server error. Please try again later.")
  //       } else if (err.message === "Network Error") {
  //         setError("Network error. Please check your connection.")
  //       } else {
  //         setError(err.response?.data?.error || err.message || "Failed to change password. Please try again.")
  //       }
  //     },
  //   })

  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('New passwords do not match.')
      return false
    }
    if (formData.newPassword.length < 6) {
      setValidationError('New password must be at least 6 characters long.')
      return false
    }
    if (formData.newPassword === formData.currentPassword) {
      setValidationError(
        'New password must be different from current password.',
      )
      return false
    }
    setValidationError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('') // Clear previous errors

    if (!validatePasswords()) {
      return
    }

    const passwordData = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    }
    // changePasswordMutation.mutate(passwordData)
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
    formData.currentPassword.trim() &&
    formData.newPassword.trim() &&
    formData.confirmPassword.trim()

  return (
    <motion.div
      key="change-password-form"
      {...screenVariants}
      className="p-4 sm:p-6"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-[#607D8B]">Change Password</h2>
        <p className="text-sm text-[#9e9e9e]">Update your account password</p>
      </div>

      {/* Error Messages */}
      {hasError && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <FaExclamationTriangle
            className="flex-shrink-0 text-red-500"
            size={20}
          />
          <p className="text-sm font-medium text-red-700">
            {error || validationError}
          </p>
        </div>
      )}

      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          {/* Current Password */}
          <div className="space-y-1">
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => {
                  setFormData({ ...formData, currentPassword: e.target.value })
                  clearErrors()
                }}
                // disabled={changePasswordMutation.isPending}
                className={`w-full rounded-xl border-2 px-4 py-3 pr-12 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:outline-none ${
                  hasError
                    ? 'border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                    : 'border-gray-200 bg-[#F0F4C3]/30 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20'
                } disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-[#9e9e9e] transition-colors duration-200 hover:text-[#607D8B] focus:text-[#607D8B] focus:outline-none disabled:opacity-50"
                onClick={() => togglePasswordVisibility('current')}
                // disabled={changePasswordMutation.isPending}
              >
                {showPasswords.current ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value })
                  clearErrors()
                }}
                // disabled={changePasswordMutation.isPending}
                className={`w-full rounded-xl border-2 px-4 py-3 pr-12 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:outline-none ${
                  hasError
                    ? 'border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                    : 'border-gray-200 bg-[#F0F4C3]/30 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20'
                } disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-[#9e9e9e] transition-colors duration-200 hover:text-[#607D8B] focus:text-[#607D8B] focus:outline-none disabled:opacity-50"
                onClick={() => togglePasswordVisibility('new')}
                // disabled={changePasswordMutation.isPending}
              >
                {showPasswords.new ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value })
                  clearErrors()
                }}
                // disabled={changePasswordMutation.isPending}
                className={`w-full rounded-xl border-2 px-4 py-3 pr-12 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:outline-none ${
                  hasError
                    ? 'border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                    : 'border-gray-200 bg-[#F0F4C3]/30 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20'
                } disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-[#9e9e9e] transition-colors duration-200 hover:text-[#607D8B] focus:text-[#607D8B] focus:outline-none disabled:opacity-50"
                onClick={() => togglePasswordVisibility('confirm')}
                // disabled={changePasswordMutation.isPending}
              >
                {showPasswords.confirm ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="mt-3 rounded-xl bg-[#F0F4C3]/20 p-3">
          <p className="mb-1 text-xs font-medium text-[#607D8B]">
            Password Requirements:
          </p>
          <ul className="space-y-1 text-xs text-[#9e9e9e]">
            <li>• At least 6 characters long</li>
            <li>• Different from your current password</li>
            <li>• Both new password fields must match</li>
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            // disabled={changePasswordMutation.isPending || !isFormValid}
            className="flex-1 transform rounded-xl bg-[#CDDC39] px-6 py-3 text-lg font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* {changePasswordMutation.isPending ? "Changing..." : "Change Password"} */}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            // disabled={changePasswordMutation.isPending}
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
