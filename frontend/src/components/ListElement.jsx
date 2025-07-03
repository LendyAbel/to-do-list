import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ListElement = ({ element, checked, handleCheck }) => {
  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  const { title, description, date } = element

  useEffect(() => {
    if (expand && ref.current) {
      setHeight(ref.current.scrollHeight)
    }
  }, [expand, description])

  const handleExpand = () => setExpand((prev) => !prev)

  return (
    <div
      onClick={handleExpand}
      className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-5 rounded-lg bg-white p-5 shadow-md"
    >
      <input
        className="scale-200"
        type="checkbox"
        onClick={(e) => {
          e.stopPropagation()
          handleCheck(element.id)
          setExpand(false)
        }}
        checked={checked}
        readOnly
      />
      <div className="flex w-full flex-col gap-2">
        <div>
          <h3 className={`text-2xl font-bold ${checked ? 'line-through' : ''}`}>
            {title}
          </h3>
          <AnimatePresence initial={false}>
            {expand && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p ref={ref}>{description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ListElement
