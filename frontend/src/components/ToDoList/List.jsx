import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Element } from '../../components'

import { getAll } from '../../services/toDoList'

// Animation for each item in the list
const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 },
}

const List = ({ isDeleteActive, activeFilter }) => {
  const [listToShow, setListToShow] = useState([])

  const result = useQuery({
    queryKey: ['posts'],
    queryFn: getAll,
    retry: false,
  })
  const list = result.data ?? []

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

  if (result.isLoading) return <div>Cargando...</div>

  if (result.isError) return <div>Error al cargar la lista</div>

  return (
    <AnimatePresence>
      <div className="bg-primary-bg flex max-h-[56vh] flex-col gap-2 overflow-y-auto rounded-lg p-3">
        {listToShow.map((element) => {
          return (
            <motion.div key={element.id} layout {...itemVariants}>
              <Element element={element} isDeleteActive={isDeleteActive} />
            </motion.div>
          )
        })}
      </div>
    </AnimatePresence>
  )
}

export default List
