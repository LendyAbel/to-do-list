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
    onSuccess: (deletedElement) => {
      const list = queryClient.getQueryData(['posts'])
      const updatedList = list.filter((el) => el.id !== deletedElement.id)
      queryClient.setQueryData(['posts'], updatedList)
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
        className="flex cursor-pointer items-center rounded-lg bg-red-300 p-2 hover:bg-red-400"
        onClick={handleClick}
      >
        <IoTrashBinOutline className="size-6" />
      </button>
      {confirmOpen && (
        <ConfirmationModal handleYes={handleYes} handleNo={handleNo} />
      )}
    </motion.div>
  )
}

export default DeleteButton
