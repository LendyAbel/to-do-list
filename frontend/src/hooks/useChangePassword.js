import { useState } from 'react'
import { changePassword } from '../services/users'

export const useChangePassword = (handleClose) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const isFormValid =
    formData.newPassword.trim() && formData.confirmPassword.trim()

  const clearErrors = () => {
    if (error) setError('')
    if (validationError) setValidationError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
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

  return {
    formData,
    setFormData,
    error,
    handleSubmit,
    handleCancel,
    clearErrors,
    validationError,
    isFormValid,
    isLoading,
  }
}
