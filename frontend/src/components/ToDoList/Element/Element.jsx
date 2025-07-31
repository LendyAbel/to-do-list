import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { DeleteButton } from '../../'
import { updateById } from '../../../services/toDoList'

const Element = ({ element, isDeleteActive }) => {
  const queryClient = useQueryClient()
  const [expand, setExpand] = useState(false)
  const ref = useRef(null)
  const { title, description } = element

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
      className={`cursor-pointer rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
        element.checked ? 'opacity-75' : ''
      }`}
      onClick={handleExpand}
    >
      <div className="flex w-full items-center gap-4">
        <div className="flex items-center">
          <input
            className="h-5 w-5 cursor-pointer rounded border-2 border-[#9e9e9e] text-[#CDDC39] focus:ring-2 focus:ring-[#CDDC39]"
            type="checkbox"
            onClick={handleCheckClick}
            checked={element.checked}
            readOnly
          />
        </div>

        <h3
          className={`flex-1 text-left text-lg font-semibold transition-all duration-200 ${
            element.checked ? 'text-[#9e9e9e] line-through' : 'text-[#607D8B]'
          }`}
        >
          {title}
        </h3>

        <div className="flex h-12 w-12 items-center justify-center">
          <AnimatePresence>
            {isDeleteActive && <DeleteButton element={element} />}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expand && description && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: 'auto',
              },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden border-t border-[#9e9e9e]/20"
          >
            <p className="mt-2 pt-2 text-sm leading-relaxed text-[#607D8B]">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Element
