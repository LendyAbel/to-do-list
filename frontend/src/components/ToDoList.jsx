import { useEffect, useState } from 'react'
import ListElement from './ListElement'
import AddElement from './AddElement'
import { motion, AnimatePresence } from 'framer-motion'
import dataList from '../data.json'

const ToDoList = () => {
  const [list, setList] = useState([])
  const [checked, setChecked] = useState({})

  useEffect(() => {
    setList(dataList)
  }, [])

  const handleCheck = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const sortedList = [
    ...list.filter((el) => !checked[el.id]),
    ...list.filter((el) => checked[el.id]),
  ]

  return (
    <div className="mx-auto flex w-5/6 flex-col gap-3 rounded-lg bg-yellow-200 p-3 shadow-lg">
      <AddElement />
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
              <ListElement
                key={element.id}
                element={element}
                checked={!!checked[element.id]}
                handleCheck={handleCheck}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default ToDoList
