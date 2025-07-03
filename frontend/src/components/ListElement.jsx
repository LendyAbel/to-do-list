import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ListElement = ({ element }) => {
  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  const { title, description, date } = element

  useEffect(() => {
    if (expand && ref.current) {
      console.log(ref.current.scrollHeight);
      
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
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex w-full flex-col gap-2">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <AnimatePresence initial={false}>
            {expand && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div ref={ref}>
                  <p>{description}</p>
                  <p className="text-right">{date}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ListElement
