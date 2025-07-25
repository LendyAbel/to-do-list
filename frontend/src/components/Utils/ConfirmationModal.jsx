import { AnimatePresence, motion } from 'framer-motion'

const ConfirmationModal = ({ handleYes, handleNo }) => {
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
  
  return (
    <AnimatePresence>
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
          <p className="text-lg font-bold">Are you sure?</p>
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
    </AnimatePresence>
  )
}

export default ConfirmationModal
