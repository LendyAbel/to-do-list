import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DeleteButton } from '../../../components'

const Element = ({ element, handleCheck, deleteElement, isDeleteActive }) => {
  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(0)
  const ref = useRef(null)
  const { title, description } = element

  const expandVariants = {
    initial: { height: 0 },
    animate: { height },
    exit: { height: 0 },
    transition: { duration: 0.2 },
  }

  useEffect(() => {
    if (ref.current) {
      const frame = requestAnimationFrame(() => {
        setHeight(ref.current.scrollHeight)
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [expand, description])

  const handleExpand = () => setExpand((prev) => !prev)

  const handleDelete = () => deleteElement(element.id)

  return (
    <div
      className="bg-light-bg cursor-pointer rounded-lg p-3 px-4 shadow-md"
      onClick={handleExpand}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <input
          className="accent-btn-primary scale-200"
          type="checkbox"
          onClick={(e) => {
            e.stopPropagation()
            handleCheck(element)
            setExpand(false)
          }}
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
            {isDeleteActive && <DeleteButton func={handleDelete} />}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {expand && (
          <motion.div
            className="text-center overflow-hidden"
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
