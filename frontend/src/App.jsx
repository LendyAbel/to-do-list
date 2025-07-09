import Heroe from './components/Heroe'
import ToDoList from './components/ToDoList'
import data from './data.json'

function App() {
  return (
    <div className='relative'>
      <Heroe />
      <ToDoList />
    </div>
  )
}

export default App
