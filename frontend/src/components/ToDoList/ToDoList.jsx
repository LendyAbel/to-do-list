import { useEffect, useState } from 'react'
import { Element, AddForm, Filter, MainButton } from '../../components'
import { motion, AnimatePresence } from 'framer-motion'
import { getAll } from '../../services/toDoList'

const ToDoList = () => {
  const [list, setList] = useState([])
  const [listToShow, setListToShow] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isDeleteActive, setIsDeleteActive] = useState(true)

  // Animation for transitioning between screens ( form <-> list )
  const screenVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  }

  // Animation for each item in the list
  const itemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  }

  useEffect(() => {
    const fetchData = async () => {
      const list = await getAll()
      setList(list)
    }
    fetchData()
  }, [])

  // Update the list to show based on the active filter
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

  const openForm = () => setFormOpen(true)

  const closeForm = () => setFormOpen(false)

  const addElement = (element) => setList((prev) => [element, ...prev])

  const activateDelete = () => setIsDeleteActive(!isDeleteActive)

  const deleteElement = (id) =>
    setList((prev) => prev.filter((el) => el.id !== id))

  const handleAddForm = (element) => {
    const { title, description } = element
    const newElement = {
      id: new Date().getTime(),
      title,
      description,
    }
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
    <div className="bg-primary-bg max-h-[80vh] w-[96%] max-w-3xl rounded-lg p-3 shadow-lg">
      <AnimatePresence mode="wait">
        {formOpen ? (
          <motion.div
            key="form"
            {...screenVariants}
            className="flex flex-col p-3"
          >
            <AddForm handleClose={closeForm} handleAdd={handleAddForm} />
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
            <AnimatePresence>
              <div className="bg-primary-bg flex max-h-[56vh] flex-col gap-2 overflow-y-auto rounded-lg p-3">
                {listToShow.map((element) => {
                  return (
                    <motion.div key={element.id} layout {...itemVariants}>
                      <Element
                        key={element.id}
                        element={element}
                        handleCheck={handleCheck}
                        deleteElement={deleteElement}
                        isDeleteActive={isDeleteActive}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ToDoList
