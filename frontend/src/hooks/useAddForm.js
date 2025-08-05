import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createNew } from '../services/toDoList'

export const useAddForm = (handleClose) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const newElement = { ...formData, checked: false }
    createMutation.mutate(newElement)
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
    })
    setError('')
    handleClose()
  }

  const createMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      handleClose()
    },
    onError: (err) => {
      if (err.response?.status === 400) {
        setError('Invalid task data. Please check your information.')
      } else if (err.response?.status === 401) {
        setError('You are not authorized. Please log in again.')
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.')
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your connection.')
      } else {
        setError(
          err.response?.data?.error ||
            err.message ||
            'Failed to create task. Please try again.',
        )
      }
    },
  })

  return {
    formData,
    setFormData,
    error,
    handleSubmit,
    handleCancel,
    isPending: createMutation.isPending,
  }
}
