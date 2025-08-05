import { useChangePassword } from '../../hooks/useChangePassword'
import ChangePasswordUI from '../../ui/ChangePasswordUI'

const ChangePasswordForm = ({ handleClose }) => {
  const {
    formData,
    setFormData,
    handleSubmit,
    handleCancel,
    error,
    validationError,
    isFormValid,
    clearErrors,
    isLoading,
  } = useChangePassword(handleClose)

  return (
    <ChangePasswordUI
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      error={error}
      validationError={validationError}
      isFormValid={isFormValid}
      clearErrors={clearErrors}
      isLoading={isLoading}
    />
  )
}

export default ChangePasswordForm
