import { useEffect, useState } from 'react'
import Element from './Element'
import AddButton from './AddButton'
import AddForm from './AddForm'
import Filter from './Filter'
import { motion, AnimatePresence } from 'framer-motion'
import dataList from '../data.json'
import { check } from 'prettier'

const ToDoList = () => {
  const [list, setList] = useState([])
  const [listToShow, setListToShow] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    setList(dataList)
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setListToShow(list)
    }
    if (activeFilter === 'todo') {
      setListToShow(list.filter((el) => !el.checked))
    }
    if (activeFilter === 'done') {
      setListToShow(list.filter((el) => el.checked))
    }
  }, [list, activeFilter])

  const openForm = () => {
    setFormOpen(true)
  }
  const closeForm = () => {
    setFormOpen(false)
  }

  const addElement = (element) => {
    setList((prev) => [element, ...prev])
  }

  const deleteElement = (id) => {
    setList((prev) => prev.filter((el) => el.id !== id))
    console.log('Element deleted:', id)
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

  const handleCheck = (element) => {
    const newElement = { ...element, checked: !element.checked }
    const updatedList = list.map((el) => {
      return el.id === element.id ? newElement : el
    })
    setList(updatedList)
  }

  const showToDo = () => setActiveFilter('todo')

  const showDone = () => setActiveFilter('done')

  const showAll = () => setActiveFilter('all')

  return (
    <div className="mx-auto flex min-h-screen w-[96%] flex-col gap-3 rounded-lg bg-yellow-200 p-3 shadow-lg">
      {formOpen ? (
        <AddForm handleClose={closeForm} handleAdd={handleAddForm} />
      ) : (
        <>
          <AddButton openForm={openForm} />
          <Filter showToDo={showToDo} showDone={showDone} showAll={showAll} />
          <AnimatePresence>
            {listToShow.map((element) => {
              return (
                <motion.div
                  key={element.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Element
                    key={element.id}
                    element={element}
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
