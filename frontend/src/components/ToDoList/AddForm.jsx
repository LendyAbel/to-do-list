import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createNew } from '../../services/toDoList'
import { motion } from 'framer-motion'

// Animation for transitioning between screens ( form <-> list )
const screenVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 },
}

const AddForm = ({ handleClose }) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const createMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
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
    <motion.div key="form" {...screenVariants} className="p-4 sm:p-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-[#607D8B]">Add New Task</h2>
        <p className="text-sm text-[#9e9e9e]">
          Create a new task to add to your list
        </p>
      </div>
      <form id="add-form" className="space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-[#607D8B]"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[120px] w-full resize-none rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
              placeholder="Enter task description"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={
              createMutation.isPending ||
              !formData.title.trim() ||
              !formData.description.trim()
            }
            className="flex-1 transform rounded-xl bg-[#CDDC39] px-6 py-3 text-lg font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createMutation.isPending ? 'Adding...' : 'Add Task'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 transform rounded-xl bg-[#607D8B] px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4c616b] hover:shadow-xl focus:ring-4 focus:ring-[#607D8B]/30 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default AddForm
