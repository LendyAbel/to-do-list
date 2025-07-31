import { Heroe, ToDoList, Login } from './components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<div className="flex flex-col items-center justify-center h-screen">
              <Login />
            </div>} />
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
