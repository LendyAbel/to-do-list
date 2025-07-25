import { useState } from 'react'
import { AddForm, Filter, MainButton, List } from '../../components'
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

  const openForm = () => setFormOpen(true)

  const closeForm = () => setFormOpen(false)

  const activateDelete = () => setIsDeleteActive(!isDeleteActive)

  //Filter functions
  const showToDo = () => setActiveFilter('todo')

  const showDone = () => setActiveFilter('done')

  const showAll = () => setActiveFilter('all')

  return (
    <div className="bg-primary-bg max-h-[80vh] w-[96%] max-w-3xl rounded-lg p-3 shadow-lg">
      <AnimatePresence mode="wait">
        {formOpen ? (
          <motion.div
            key="form"
            {...screenVariants}
            className="flex flex-col p-3"
          >
            <AddForm handleClose={closeForm} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            {...screenVariants}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-center gap-5">
              <MainButton label="Add Element" icon="add" func={openForm} />
              <MainButton
                label="Delete"
                deleteActive={isDeleteActive}
                icon="delete"
                func={activateDelete}
              />
            </div>
            <Filter showToDo={showToDo} showDone={showDone} showAll={showAll} />
            <List isDeleteActive={isDeleteActive} activeFilter={activeFilter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ToDoList
