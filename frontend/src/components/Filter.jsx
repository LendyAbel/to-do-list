import { useState } from 'react'

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState([true, false, false])

  const todoHandler = () => {
    setActiveFilter([true, false, false])
  }

  const doneHandler = () => {
    setActiveFilter([false, true, false])
  }

  const allHandler = () => {
    setActiveFilter([false, false, true])
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <button
        className={`rounded-md p-3 ${
          activeFilter[0]
            ? 'bg-yellow-300'
            : 'bg-yellow-100 hover:bg-yellow-400'
        }`}
        onClick={todoHandler}
      >
        To Do
      </button>
      <button
        className={`rounded-md p-3 ${
          activeFilter[1]
            ? 'bg-yellow-300'
            : 'bg-yellow-100 hover:bg-yellow-400'
        }`}
        onClick={doneHandler}
      >
        Done
      </button>
      <button
        className={`rounded-md p-3 ${
          activeFilter[2]
            ? 'bg-yellow-300'
            : 'bg-yellow-100 hover:bg-yellow-400'
        }`}
        onClick={allHandler}
      >
        All
      </button>
    </div>
  )
}

export default Filter
