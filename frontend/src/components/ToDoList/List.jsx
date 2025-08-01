import { useQuery } from '@tanstack/react-query'
import { getAll } from '../../services/toDoList'
import { useMemo } from 'react'
import { Element } from '../'
import { motion } from 'framer-motion'

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

const List = ({ activeFilter, isDeleteActive, className }) => {
  const result = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      getAll(JSON.parse(localStorage.getItem('loggedBlogsappUser'))),
    retry: false,
  })

  const list = result.data ?? []

  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return list
    if (activeFilter === 'todo') return list.filter((el) => !el.checked)
    if (activeFilter === 'done') return list.filter((el) => el.checked)
    return list
  }, [list, activeFilter])

  if (result.isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-[#9e9e9e]">Loading tasks...</div>
      </div>
    )
  }

  if (result.isError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-red-500">Error loading tasks</div>
      </div>
    )
  }

  if (filteredList.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-[#9e9e9e]">No tasks found</div>
      </div>
    )
  }

  return (
    <div
      className={`max-h-[60vh] overflow-y-auto px-2 py-3 ${className || ''}`}
    >
      {filteredList.map((element) => (
        <motion.div key={element.id} layout {...itemVariants}>
          <Element element={element} isDeleteActive={isDeleteActive} />
        </motion.div>
      ))}
    </div>
  )
}

export default List
