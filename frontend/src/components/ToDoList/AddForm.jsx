import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { form } from 'motion/react-client'
import { useState } from 'react'

import { createNew } from '../../services/toDoList'

const AddForm = ({ handleClose }) => {
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const createMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (createdElement) => {
      const list = queryClient.getQueryData(['posts'])
      queryClient.setQueryData(['posts'], list.concat(createdElement))
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newElement = { ...formData, checked: false }
    createMutation.mutate(newElement)
    handleClose()
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
    })
    handleClose()
  }

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex w-3/4 flex-col items-start justify-center gap-2">
        <label
          className="text-text-primary block text-lg font-semibold"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-light-bg w-full rounded-lg border p-1 shadow-md"
          required
        />
        <label
          className="text-text-primary block text-lg font-semibold"
          htmlFor="description"
        >
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="bg-light-bg w-full resize-none rounded-lg border p-1 shadow-md"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-btn-primary hover:bg-btn-hover w-2/5 cursor-pointer rounded-lg p-1 shadow-md"
      >
        Add
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="w-2/5 cursor-pointer rounded-lg bg-red-400 p-1 shadow-md hover:bg-red-500"
      >
        Cancel
      </button>
    </form>
  )
}

export default AddForm
