import { Heroe, ToDoList, Login } from './components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/toDoList"
          element={
            <div className="flex flex-col items-center">
              <Heroe />
              <ToDoList />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
