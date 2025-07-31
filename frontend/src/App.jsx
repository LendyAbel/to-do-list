import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { ToDoList, Login } from './components'
import HeroLayout from './Layout/HeroLayout'

function App() {
  return (
    <BrowserRouter>
      <HeroLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/toDoList" element={<ToDoList />} />
        </Routes>
      </HeroLayout>
    </BrowserRouter>
  )
}

export default App
