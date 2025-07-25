import { useRef, useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { DeleteButton } from '../../../components'
import { updateById } from '../../../services/toDoList'

const Element = ({ element, isDeleteActive }) => {
  const queryClient = useQueryClient()

  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(0)
  const ref = useRef(null)
  const { title, description } = element

  useEffect(() => {
    if (ref.current) {
      const frame = requestAnimationFrame(() => {
        setHeight(ref.current.scrollHeight)
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [expand, description])

  const expandVariants = {
    initial: { height: 0 },
    animate: { height },
    exit: { height: 0 },
    transition: { duration: 0.2 },
  }

  const checkMutation = useMutation({
    mutationFn: updateById,
    onSuccess: (updatedElement) => {
      const list = queryClient.getQueryData(['posts'])
      const updatedList = list.map((el) =>
        el.id === updatedElement.id ? updatedElement : el,
      )
      queryClient.setQueryData(['posts'], updatedList)
    },
  })

  const handleExpand = () => setExpand((prev) => !prev)
  const handleCheckClick = (e) => {
    e.stopPropagation()
    const newElement = { ...element, checked: !element.checked }
    checkMutation.mutate(newElement)
    setExpand(false)
  }

  return (
    <div
      className="bg-light-bg cursor-pointer rounded-lg p-3 px-4 shadow-md"
      onClick={handleExpand}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <input
          className="accent-btn-primary scale-200"
          type="checkbox"
          onClick={handleCheckClick}
          checked={element.checked}
          readOnly
        />
        <h3
          className={`flex-1 text-center font-bold ${element.checked ? 'text-text-inactive line-through' : 'text-text-secondary'}`}
        >
          {title}
        </h3>
        <div className="flex h-12 w-12 items-center justify-center">
          <AnimatePresence>
            {isDeleteActive && <DeleteButton element={element} />}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {expand && (
          <motion.div
            className="overflow-hidden text-center"
            ref={ref}
            {...expandVariants}
          >
            <p className="text-text-secondary py-2">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Element
