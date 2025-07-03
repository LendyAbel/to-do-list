import ListElement from './ListElement'

import list from '../data.json'

console.log(list)

const ToDoList = () => {
  return (
    <div className="dar bg-white">
      <h2>List of task:</h2>
      {list.map((element) => {
        return <ListElement key={element.id} element={element} />
      })}
    </div>
  )
}

export default ToDoList
