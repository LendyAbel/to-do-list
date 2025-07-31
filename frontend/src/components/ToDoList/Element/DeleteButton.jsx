import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteById } from '../../../services/toDoList'
import { ConfirmationModal } from '../../'
import { IoTrashBinOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'

const DeleteButton = ({ element }) => {
  const queryClient = useQueryClient()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const deleteMutation = useMutation({
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const inOutVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: { duration: 0.2 },
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleYes = () => {
    deleteMutation.mutate(element)
    setConfirmOpen(false)
  }

  const handleNo = () => setConfirmOpen(false)

  return (
    <motion.div className="relative" {...inOutVariants}>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl focus:ring-2 focus:ring-red-500/30 focus:outline-none"
        onClick={handleClick}
      >
        <IoTrashBinOutline className="size-5" />
      </button>
      {confirmOpen && (
        <ConfirmationModal
          handleYes={handleYes}
          handleNo={handleNo}
          setConfirmOpen={setConfirmOpen}
        />
      )}
    </motion.div>
  )
}

export default DeleteButton
