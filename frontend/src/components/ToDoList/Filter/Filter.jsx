import { useState } from 'react'
import { FilterButton } from '../../../components'

const Filter = ({ showToDo, showDone, showAll }) => {
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
      <FilterButton
        label={'To Do'}
        func={todoHandler}
        isActive={activeFilter[0]}
      />
      <FilterButton
        label={'Done'}
        func={doneHandler}
        isActive={activeFilter[1]}
      />
      <FilterButton
        label={'All'}
        func={allHandler}
        isActive={activeFilter[2]}
      />
    </div>
  )
}

export default Filter
