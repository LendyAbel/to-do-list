import { useEffect, useState } from 'react'
import Element from './Element'
import AddButton from './AddButton'
import AddForm from './AddForm'
import { motion, AnimatePresence } from 'framer-motion'
import dataList from '../data.json'

const ToDoList = () => {
  const [list, setList] = useState([])
  const [checked, setChecked] = useState({})
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    setList(dataList)
  }, [])

  const handleCheck = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const addElement = (element) => {
    setList((prev) => [element, ...prev])
  }

  const deleteElement = (id) => {
    setList((prev) => prev.filter((el) => el.id !== id))
    console.log('Element deleted:', id)
  }

  const openForm = () => {
    setFormOpen(true)
  }
  const closeForm = () => {
    setFormOpen(false)
  }

  const handleAddForm = (element) => {
    const { title, description } = element
    const newElement = {
      id: new Date().getTime(),
      title,
      description,
    }

    console.log('Adding new element:', newElement)
    addElement(newElement)
  }

  const sortedList = [
    ...list.filter((el) => !checked[el.id]),
    ...list.filter((el) => checked[el.id]),
  ]

  return (
    <div className="mx-auto flex w-[96%] flex-col gap-3 rounded-lg bg-yellow-200 p-3 shadow-lg">
      {formOpen ? (
        <AddForm handleClose={closeForm} handleAdd={handleAddForm} />
      ) : (
        <>
          <AddButton openForm={openForm} />
          <AnimatePresence>
            {sortedList.map((element) => {
              return (
                <motion.div
                  key={element.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <Element
                    key={element.id}
                    element={element}
                    checked={!!checked[element.id]}
                    handleCheck={handleCheck}
                    deleteElement={deleteElement}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default ToDoList
