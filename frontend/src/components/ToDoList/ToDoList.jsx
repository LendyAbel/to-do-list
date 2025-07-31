import { useState } from 'react'
import { List, AddForm, Filter, MainButton } from '../'
import { motion, AnimatePresence } from 'framer-motion'

// Animation for transitioning between screens ( form <-> list )
const screenVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 },
}

const ToDoList = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  //Form functions
  const openForm = () => setFormOpen(true)

  const closeForm = () => setFormOpen(false)

  const activateDelete = () => setIsDeleteActive(!isDeleteActive)

  //Filter functions
  const showToDo = () => setActiveFilter('todo')

  const showDone = () => setActiveFilter('done')

  const showAll = () => setActiveFilter('all')

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl">
        <AnimatePresence mode="wait">
          {formOpen ? (
            <AddForm handleClose={closeForm} />
          ) : (
            <motion.div key="list" {...screenVariants} className=" p-4 sm:p-6">
              <div className="mb-2">
                <h2 className=" text-2xl font-bold text-[#607D8B]">
                  Your Tasks
                </h2>
                <p className="text-sm text-[#9e9e9e]">
                  Manage and organize your daily tasks
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 rounded-xl p-2">
                <MainButton
                  label="Add Element"
                  icon="add"
                  func={openForm}
                  className="transform rounded-xl bg-[#CDDC39] px-6 py-3 font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none"
                />
                <MainButton
                  label="Delete"
                  deleteActive={isDeleteActive}
                  icon="delete"
                  func={activateDelete}
                  className={`transform rounded-xl px-6 py-3 font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:ring-4 focus:outline-none ${
                    isDeleteActive
                      ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/30'
                      : 'bg-[#607D8B] text-white hover:bg-[#4c616b] focus:ring-[#607D8B]/30'
                  }`}
                />
              </div>

              {/* Filter Section */}
              <div className="mb-2">
                <Filter
                  showToDo={showToDo}
                  showDone={showDone}
                  showAll={showAll}
                  activeFilter={activeFilter}
                  className="flex flex-wrap justify-center gap-2 rounded-xl  p-2"
                />
              </div>

              {/* Tasks List */}
              <div className="min-h-[300px] rounded-xl p-2">
                <List
                  activeFilter={activeFilter}
                  isDeleteActive={isDeleteActive}
                  className="space-y-3"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ToDoList
