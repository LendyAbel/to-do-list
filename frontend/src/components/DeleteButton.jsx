import { useState } from 'react'
import { ConfirmationModal } from '../components'
import { IoTrashBinOutline } from 'react-icons/io5'
import { animate, motion, scale } from 'framer-motion'

const DeleteButton = ({ func }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const inOutVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: {duration: 0.2}
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleYes = () => {
    func()
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
