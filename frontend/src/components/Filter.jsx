import { useState } from 'react'

const Filter = ({showToDo, showDone, showAll}) => {
  const [activeFilter, setActiveFilter] = useState([false, false, true])

  const todoHandler = () => {
    setActiveFilter([true, false, false])
    showToDo()
  }

  const doneHandler = () => {
    setActiveFilter([false, true, false])
    showDone()
  }

  const allHandler = () => {
    setActiveFilter([false, false, true])
    showAll()
  }



  return (
    <div className="grid grid-cols-3 gap-5">
      <button
        className={`cursor-pointer rounded-md p-3 ${
          activeFilter[0]
            ? 'border-yellow-500 bg-yellow-300'
            : 'bg-yellow-100 hover:bg-yellow-400'
        }`}
        onClick={todoHandler}
      >
        To Do
      </button>
      <button
        className={`cursor-pointer rounded-md p-3 ${
          activeFilter[1]
            ? 'bg-yellow-300'
            : 'bg-yellow-100 hover:bg-yellow-400'
        }`}
        onClick={doneHandler}
      >
        Done
      </button>
      <button
        className={`cursor-pointer rounded-md p-3 ${
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
