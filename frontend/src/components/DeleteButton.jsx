import { useState } from 'react'
import deleteIcon from '../assets/icons/icons8-basura-llena-48.svg'
import { AnimatePresence, motion } from 'framer-motion'

const confirmVariants = {
  initial: { opacity: 0, y: -300 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -300 },
  transition: { duration: 0.3 },
}

const bgVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
}

const DeleteButton = ({ deleteElement, id }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleYes = () => {
    deleteElement(id)
    setConfirmOpen(false)
  }

  const handleNo = () => setConfirmOpen(false)

  return (
    <div className="relative flex w-full flex-row justify-end">
      <button
        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-red-300 px-3 py-2 hover:bg-red-400"
        onClick={handleClick}
      >
        <img src={deleteIcon} alt="delete icon" className="w-5" />
      </button>

      <AnimatePresence mode="wait">
        {confirmOpen && (
          <motion.div
            key="confirm-bg"
            {...bgVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={(e) => {
              e.stopPropagation()
              setConfirmOpen(false)
            }}
          >
            <motion.div
              key="confirm"
              {...confirmVariants}
              className="flex flex-col items-center gap-2 rounded-lg bg-red-300 px-6 py-4 opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm">Are you sure?</p>
              <div className="flex flex-row gap-2">
                <button
                  className="cursor-pointer rounded-lg bg-red-400 px-3 py-1 hover:bg-red-500"
                  onClick={handleYes}
                >
                  Yes
                </button>
                <button
                  className="cursor-pointer rounded-lg bg-gray-400 px-3 py-1 hover:bg-gray-500"
                  onClick={handleNo}
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DeleteButton
