import ListElement from './ListElement'

import list from '../data.json'

console.log(list)

const ToDoList = () => {
  return (
    <div className="mx-auto flex w-5/6 flex-col gap-3 rounded-lg bg-yellow-200 p-3 shadow-lg">
      {list.map((element) => {
        return <ListElement key={element.id} element={element} />
      })}
    </div>
  )
}

export default ToDoList
