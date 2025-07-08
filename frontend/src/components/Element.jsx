import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DeleteButton } from '../components'

const Element = ({ element, handleCheck, deleteElement }) => {
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

  const handleExpand = () => setExpand((prev) => !prev)

  return (
    <div
      onClick={handleExpand}
      className="grid w-full cursor-pointer grid-cols-[auto_1fr] items-center gap-5 rounded-lg bg-white p-5 shadow-md"
    >
      <input
        className="scale-200"
        type="checkbox"
        onClick={(e) => {
          e.stopPropagation()
          handleCheck(element)
          setExpand(false)
        }}
        checked={element.checked}
        readOnly
      />
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <h3 className={`font-bold ${element.checked ? 'line-through' : ''}`}>
            {title}
          </h3>
          <AnimatePresence>
            {expand && (
              <motion.div
                className="flex flex-col overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                ref={ref}
              >
                <p>{description}</p>
                <DeleteButton deleteElement={deleteElement} id={element.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Element
