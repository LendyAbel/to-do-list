import { useState } from 'react'
import { FilterButton } from '../../../components'

const Filter = ({ showToDo, showDone, showAll, className }) => {
  const [activeFilterState, setActiveFilterState] = useState([
    false,
    false,
    true,
  ])

  const todoHandler = () => {
    setActiveFilterState([true, false, false])
    showToDo()
  }

  const doneHandler = () => {
    setActiveFilterState([false, true, false])
    showDone()
  }

  const allHandler = () => {
    setActiveFilterState([false, false, true])
    showAll()
  }

  return (
    <div className={`grid grid-cols-3 gap-3 ${className || ''}`}>
      <FilterButton
        label="To Do"
        func={todoHandler}
        isActive={activeFilterState[0]}
      />
      <FilterButton
        label="Done"
        func={doneHandler}
        isActive={activeFilterState[1]}
      />
      <FilterButton
        label="All"
        func={allHandler}
        isActive={activeFilterState[2]}
      />
    </div>
  )
}

export default Filter
