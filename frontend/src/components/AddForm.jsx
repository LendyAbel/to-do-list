import { motion } from 'framer-motion'
import { useState } from 'react'

const AddForm = ({ handleClose, handleAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setDate()
    console.log('Form submitted:', formData)
    handleAdd(formData)
    handleClose()
  }

  const setDate = () => {
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0] // YYYY-MM-DD format
    setFormData((prev) => ({ ...prev, date: formattedDate }))
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
    })
    console.log('Form closed')
    handleClose()
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 bg-yellow-200">
      <motion.form
        className="flex w-full flex-col items-center justify-center gap-3"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-lg font-semibold">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-lg border p-1 shadow-md"
              required
            />
          </label>
          <label className="block text-lg font-semibold">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full resize-none rounded-lg border p-1 shadow-md"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-2/5 cursor-pointer rounded-lg bg-green-400 p-1 shadow-md hover:bg-green-500"
        >
          Add
        </button>
        <button
          onClick={handleCancel}
          className="w-2/5 cursor-pointer rounded-lg bg-red-400 p-1 shadow-md hover:bg-red-500"
        >
          Cancel
        </button>
      </motion.form>
    </div>
  )
}

export default AddForm
