import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

const ConfirmationModal = ({ handleYes, handleNo, setConfirmOpen }) => {
  const confirmVariants = {
    initial: { opacity: 0, scale: 0.8, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 },
    transition: { duration: 0.2 },
  }

  const bgVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  }

  return typeof document !== 'undefined'
    ? createPortal(
        <AnimatePresence>
          <motion.div
            key="confirm-bg"
            {...bgVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              setConfirmOpen(false)
            }}
          >
            <motion.div
              key="confirm"
              {...confirmVariants}
              className="mx-4 max-w-sm rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-[#607D8B]">
                  Delete Task
                </h3>
                <p className="text-[#9e9e9e]">
                  Are you sure you want to delete this task? This action cannot
                  be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl focus:ring-2 focus:ring-red-500/30 focus:outline-none"
                  onClick={handleYes}
                >
                  Delete
                </button>
                <button
                  className="flex-1 rounded-xl bg-[#607D8B] px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#4c616b] hover:shadow-xl focus:ring-2 focus:ring-[#607D8B]/30 focus:outline-none"
                  onClick={handleNo}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body,
      )
    : null
}

export default ConfirmationModal
