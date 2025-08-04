import { motion } from 'framer-motion'
import Header from './Elements/Header'
import ErrorMenssage from './utils/ErrorMenssage'
import TextInput from './Elements/TextInput'
import TextArea from './Elements/TextArea'
import AcceptButton from './Elements/AcceptButton'
import CancelButton from './Elements/CancelButton'

const AddFormUI = ({
  formData,
  setFormData,
  handleSubmit,
  handleCancel,
  error,
  isPending,
}) => {
  const screenVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  }

  return (
    <motion.div key="form" {...screenVariants} className="p-4 sm:p-6">
      <Header
        title={'Add New Task'}
        description={'Create a new task to add to your list'}
      />

      {error && <ErrorMenssage error={error} />}

      <form id="add-form" className="space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <TextInput
            name={'title'}
            label={'Task Title'}
            value={'title'}
            data={formData}
            setData={setFormData}
          />
          <TextArea
            name={'description'}
            label={'Description'}
            value={'description'}
            data={formData}
            setData={setFormData}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <AcceptButton
            label="Add Task"
            loadingLabel="Adding..."
            type="submit"
            disable={
              isPending ||
              !formData?.title.trim() ||
              !formData?.description.trim()
            }
            isPending={isPending}
          />

          <CancelButton label="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </motion.div>
  )
}

export default AddFormUI
