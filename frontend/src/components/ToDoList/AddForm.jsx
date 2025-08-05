import { useAddForm } from '../../hooks/useAddForm'
import AddFormUI from '../../ui/AddFormUI'

const AddForm = ({ handleClose }) => {
  const {
    error,
    handleSubmit,
    formData,
    setFormData,
    isPending,
    handleCancel,
  } = useAddForm(handleClose)

  return (
    <AddFormUI
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      error={error}
      isPending={isPending}
    />
  )
}

export default AddForm
